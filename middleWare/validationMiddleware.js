// validationMiddleware.js
import { z } from 'zod'

export function validateOperation(operation, data, validationRegistry) {

    console.log('=== VALIDATION DEBUG ===')
  console.log('Operation:', JSON.stringify(operation, null, 2))
  console.log('Data:', JSON.stringify(data, null, 2))
  console.log('Registry keys:', Object.keys(validationRegistry || {}))
  console.log('Model exists?', operation.model in (validationRegistry || {}))

  const modelSchemas = validationRegistry?.[operation.model]
  console.log('Model schemas:', modelSchemas ? Object.keys(modelSchemas) : 'undefined')
  
  const schema = validationRegistry[operation.model]?.[operation.action]

  console.log('Schema found?', schema !== undefined)
  console.log('Schema type:', typeof schema)
  console.log('Is Zod schema?', schema?._def !== undefined)
  console.log('======================')
  // Skip validation if no schema defined
  if (!schema) {
      console.log('No schema found, skipping validation')
    return { isValid: true, data: data || {} }
  }


   // Verify it's actually a Zod schema
  if (!schema._def) {
    console.error('ERROR: schema is not a valid Zod schema!', schema)
    return {
      isValid: false,
      errors: [{
        path: 'schema',
        message: 'Invalid validation schema configuration',
        code: 'invalid_schema'
      }]
    }
  }
  

  const result = schema.safeParse(data);

if (!result.success) {
  // console.log(result.error.issues); // array of ZodIssue objects

   const formatted = Object.fromEntries(
    result.error.issues.map(err => {
      const field = err.path[err.path.length - 1]; // 'name', 'phone', etc.
      return [field, err.message];
    }));

  return {
    isValid: false,
    error:formatted,
    data:formatted
  }
} else {
  // console.log(result.data); // validated form data
  return { isValid: true, data: result.data }
  
}

   

  // try {
  //   const validatedData = (data === undefined || data === null) 
  //     ? {} 
  //     : schema.parse(data)
  //    console.log('Validation passed')
  //   return { isValid: true, data: validatedData }
    
  // } catch (error) {
  //   // detect Zod errors even if instanceof fails (different module instances/bundling)
  //   const isZodError =
  //     error instanceof z.ZodError ||
  //     error?.name === 'ZodError' ||
  //     Array.isArray(error?.issues) ||
  //     Array.isArray(error?.errors)

  //   const issues = error?.issues ?? error?.errors ?? []

  //   if (isZodError) {
  //     console.log('Zod validation error:', issues)
  //     return {
  //       isValid: false,
  //       errors: issues.map(err => ({
  //         path: Array.isArray(err.path) ? err.path.join('.') : String(err.path ?? 'unknown'),
  //         field: Array.isArray(err.path) ? err.path[1] : String(err.path ?? 'unknown'),
  //         message: err.message ?? 'Validation failed',
  //         code: err.code ?? 'custom'
  //       })),
  //       data:Object.fromEntries(
  //         issues
  //         .filter(err => err?.path?.[1])
  //         .map(err=>
  //           [err.path[1], err.message ?? 'Validation failed']
  //         )
  //       )
  //     }
  //   }

  //   console.error('Unexpected validation error:', error)
  //   console.error('Error stack:', error?.stack)
  //   return {
  //     isValid: false,
  //     errors: [{
  //       path: 'unknown',
  //       message: error?.message ?? 'Validation failed',
  //       code: 'custom'
  //     }],
  //     data:[]
  //   }
  // }
}
