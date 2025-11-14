
import dotenv from "dotenv";
import { fileURLToPath,pathToFileURL  } from 'url';
import path, { dirname } from 'path';
import PrismaErrorHandler  from './utility/errorHandler.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
// let services = null;
import prisma from './config/prisma.js';
import { validateOperation } from "./middleWare/validationMiddleware.js";
import { validationRegistry } from './utility/validationSchema.js';


const get_data=async(operation,data)=>{

    const schema = validationRegistry[operation.model]?.[operation.action];
   let res;
    if(schema){
        console.log("Schema found");
        try{
             res = schema.safeParse(data);
        }catch(error){
            console.log("zod error",error)
        }
     
    }else{
         res={data:{}};
    }

    console.log("res ======",res);
    return;
    try{
         const result = await prisma[operation.model][operation.action](res.data)
        console.log("final result",result)
    }catch(err){
        console.log("err",err)
    }
}

const findById=async(operation,data)=>{

}

const operation_select={
    model:'user',
    action:'findMany'
}

get_data(operation_select,{
        orderBy: {
          createdAt: "desc",
        }
      })
const operation_find_by_id={
    model:'business',
    action:'findUnique'
}
const operation_findFirst={
    model:'business',
    action:'findFirst'
}
const operation_findFirstThrow={
    model:'business',
    action:'findFirstOrThrow'
}

const operation_groupby={
    model:'business',
    action:'groupBy'
}

const operation_count={
    model:'business',
    action:'count'
}

// get_data(operation_find_by_id,{where:{id:"f67e86b3-b31f-4fb5-b8ac-02ee57aa2ca0"}})

// get_data(operation_select,{select:{name:true,id:true}});
//  get_data(operation_select);

// get_data(operation_findFirst)
// get_data(operation_findFirst,{orderBy:{createdAt:'ase'}})


// get_data(operation_findFirstThrow)
// get_data(operation_findFirstThrow,{orderBy:{phone:'ase'}})

// get_data(operation_groupby,{by:['name']})


// get_data(operation_count)
 