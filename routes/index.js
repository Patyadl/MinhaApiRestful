import { Router } from 'express'
import {produtosRoutes} from './Produtos.js'

const routes = Router();

routes.use('/' , produtosRoutes)

export { routes };