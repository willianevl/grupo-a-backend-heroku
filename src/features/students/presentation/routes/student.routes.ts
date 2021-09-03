import { Router } from "express";
import { RequiredParamsMiddleware, StudentAlreadyExistsMiddleware } from "..";
import { EMvc, middlewareAdapter, MvcController, routerMvcAdapter, StudentAlreadyExistsError } from "../../../../core/presentation";
import { StudentRepository } from "../../infra";
import { StudentController } from "../controllers";



const makeController = (): MvcController => {
    const repository = new StudentRepository;
    return new StudentController(repository);
};

export class StudentRoutes {
    public init(routes: Router) {
        
        routes.post("/student", 
            middlewareAdapter(new RequiredParamsMiddleware()),
            middlewareAdapter(new StudentAlreadyExistsMiddleware()),
            routerMvcAdapter(makeController(), EMvc.CREATE)
        );

        routes.get("/student", routerMvcAdapter(makeController(), EMvc.INDEX));

        routes.get("/student/:ra", 
            routerMvcAdapter(makeController(), EMvc.SHOW)
        );

        routes.put("/student/:ra", 
            middlewareAdapter(new RequiredParamsMiddleware()), 
            routerMvcAdapter(makeController(), EMvc.UPDATE)
        );

        routes.delete("/student/:ra", 
            routerMvcAdapter(makeController(), EMvc.DELETE)
        );
        
        return routes;
    }
}