// errorHandler.js
import { Prisma } from '@prisma/client';
import { z } from 'zod'
class PrismaErrorHandler {
  static handle(error) {

    // Safety check for ZodError (shouldn't reach here, but just in case)
    if (error instanceof z.ZodError) {
      console.error('ZodError in Prisma handler (should not happen):', error)
      return {
        success: false,
        error: {
          type: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error.errors
        }
      }
    }

    // Handle Prisma Validation Errors (missing/invalid fields)
    if (error instanceof Prisma.PrismaClientValidationError) {
      return this.handleValidationError(error);
    }
    
    // Handle Prisma Known Request Errors (constraint violations)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handleKnownRequestError(error);
    }
    
    // console.log("error from other",error)
    // Handle unknown errors
    return {
      success: false,
      error: {
        type: 'UNKNOWN',
        message: error.message || 'An unexpected error occurred'
      },
      data: {}
    };
  }

  // Handle validation errors (missing fields, wrong types)
  static handleValidationError(error) {
    const message = error.message;
    const fieldErrors = {};
    
    // Parse the error message to extract field information
    // Example: "Argument `email` is missing" or "Argument `data` is missing"
    const missingFieldMatch = message.match(/Argument `(\w+)` is missing/);
    const invalidValueMatch = message.match(/Argument `(\w+)`.*Got invalid value/);
    
    if (missingFieldMatch) {
      const field = missingFieldMatch[1];
      let fieldNmae=field.charAt(0).toUpperCase() + field.slice(1);
      fieldErrors[field] = `${fieldNmae} is required`;
    }
    
    if (invalidValueMatch) {
      const field = invalidValueMatch[1];
      fieldErrors[field] = `Invalid value for ${field}`;
    }
    
    // Extract all missing fields from the detailed error message
    const dataMatch = message.match(/Argument `data` of type.*?is missing/);
    if (dataMatch) {
      // This means the entire data object is missing or empty
      return {
        success: false,
        error: {
          type: 'VALIDATION_ERROR',
          message: 'Required fields are missing',
          details: 'All required fields must be provided'
        },
        data: {
          _form: 'All required fields must be provided'
        }
      };
    }
    
    // Extract required fields from schema if mentioned in error
    const requiredFieldsMatch = message.match(/Argument (\w+) for data\.(\w+) is missing/g);
    if (requiredFieldsMatch) {
      requiredFieldsMatch.forEach(match => {
        const fieldMatch = match.match(/data\.(\w+)/);
        if (fieldMatch) {
          const field = fieldMatch[1];
          fieldErrors[field] = `${field} is required`;
        }
      });
    }
    
    return {
      success: false,
      error: {
        type: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: Object.keys(fieldErrors).length > 0 
          ? `Missing or invalid fields: ${Object.keys(fieldErrors).join(', ')}`
          : 'Please check your input'
      },
      data: Object.keys(fieldErrors).length > 0 ? fieldErrors : { _form: 'Validation failed' }
    };
  }
  
  // Handle database constraint errors
  static handleKnownRequestError(error) {
    const errorMap = {
      P2002: (meta) => {
        const field = meta?.target?.[0] || 'field';
        const fieldErrors = {};
        
        if (meta?.target && Array.isArray(meta.target)) {
          meta.target.forEach(targetField => {
            fieldErrors[targetField] = `This ${targetField} already exists`;
          });
        } else {
          fieldErrors[field] = `This ${field} already exists`;
        }
        
        return {
          type: 'UNIQUE_CONSTRAINT',
          field: field,
          message: `${field} must be unique`,
          fieldErrors: fieldErrors
        };
      },
      
      P2003: (meta) => {
        const field = meta?.field_name || 'reference';
        return {
          type: 'FOREIGN_KEY',
          field: field,
          message: 'Referenced record does not exist',
          fieldErrors: {
            [field]: 'Invalid reference - this record does not exist'
          }
        };
      },
      
      P2011: (meta) => {
        const constraint = meta?.constraint || 'field';
        return {
          type: 'NULL_CONSTRAINT',
          field: constraint,
          message: 'Required field cannot be null',
          fieldErrors: {
            [constraint]: 'This field is required and cannot be null'
          }
        };
      },
      
      P2014: (meta) => {
        return {
          type: 'INVALID_ID',
          message: 'The provided ID is invalid',
          fieldErrors: {
            id: 'Invalid ID format'
          }
        };
      },
      
      P2025: (meta) => {
        return {
          type: 'NOT_FOUND',
          message: 'Record not found',
          fieldErrors: {
            id: 'The requested record does not exist'
          }
        };
      }
    };

    const handler = errorMap[error.code];
    if (handler) {
      const errorInfo = handler(error.meta);
      return { 
        success: false, 
        error: errorInfo,
        data: errorInfo.fieldErrors
      };
    }

    return {
      success: false,
      error: {
        type: 'DATABASE_ERROR',
        code: error.code,
        message: error.message
      },
      data: {}
    };
  }
}

export default PrismaErrorHandler;


// class PrismaErrorHandler {
//   static handle(error) {
//     const errorMap = {
//       P2002: (meta) => {
//         const field = meta?.target?.[0] || 'field';
//         const fieldErrors = {};
        
//         // Create field-level error for each target field
//         if (meta?.target && Array.isArray(meta.target)) {
//           meta.target.forEach(targetField => {
//             fieldErrors[targetField] = `${targetField} already exists`;
//           });
//         } else {
//           fieldErrors[field] = `${field} already exists`;
//         }
        
//         return {
//           type: 'UNIQUE_CONSTRAINT',
//           field: field,
//           message: `${field} already exists`,
//           fieldErrors: fieldErrors
//         };
//       },
      
//       P2003: (meta) => {
//         const field = meta?.field_name || 'reference';
//         return {
//           type: 'FOREIGN_KEY',
//           field: field,
//           message: 'Referenced record does not exist',
//           fieldErrors: {
//             [field]: 'Invalid reference - record does not exist'
//           }
//         };
//       },
      
//       P2011: (meta) => {
//         const field = meta?.constraint || 'field';
//         return {
//           type: 'NULL_CONSTRAINT',
//           field: field,
//           message: 'Required field is missing',
//           fieldErrors: {
//             [field]: 'This field is required'
//           }
//         };
//       },
      
//       P2025: (meta) => {
//         return {
//           type: 'NOT_FOUND',
//           message: 'Record not found',
//           fieldErrors: {
//             id: 'Record does not exist'
//           }
//         };
//       }
//     };

//     const handler = errorMap[error.code];
//     if (handler) {
//       const errorInfo = handler(error.meta);
//       return { 
//         success: false, 
//         error: errorInfo,
//         data: errorInfo.fieldErrors // Field-level errors
//       };
//     }

//     return {
//       success: false,
//       error: {
//         type: 'UNKNOWN',
//         message: error.message
//       },
//       data: {}
//     };
//   }
// }

// export default PrismaErrorHandler;



// class PrismaErrorHandler {
//   static handle(error) {
//     const errorMap = {
//       P2002: (meta) => ({
//         type: 'UNIQUE_CONSTRAINT',
//         field: meta?.target?.[0],
//         message: `${meta?.target?.[0] || 'Field'} already exists`
//       }),
//       P2003: (meta) => ({
//         type: 'FOREIGN_KEY',
//         field: meta?.field_name,
//         message: 'Referenced record does not exist'
//       }),
//       P2011: (meta) => ({
//         type: 'NULL_CONSTRAINT',
//         field: meta?.constraint,
//         message: 'Required field is missing'
//       })
//     };

//     const handler = errorMap[error.code];
//     if (handler) {
//       return { success: false, 
//               error: handler(error.meta),
//              };
//     }

//     return {
//       success: false,
//       error: {
//         type: 'UNKNOWN',
//         message: error.message
//       }
//     };
//   }
// }

// export default PrismaErrorHandler;
