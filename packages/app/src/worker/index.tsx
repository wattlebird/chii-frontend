import registerPromiseWorker from 'promise-worker/register'
import PromiseWorker from 'promise-worker'
import { execute, GraphQLSchema } from 'graphql'
import { ApolloLink, Observable, Operation } from '@apollo/client'

interface WorkerParam {
  schema: GraphQLSchema
  context: object
}

export const createWorker = ({ schema, context }: WorkerParam) =>
  registerPromiseWorker((request) => {
    if (request) {
      return Promise.resolve().then(() =>
        execute({
          schema,
          document: request.query,
          rootValue: {},
          contextValue: Object.assign({}, request.context || {}, context),
          variableValues: request.variables,
          operationName: request.operationName
        })
      )
    }
    return Promise.resolve()
  })

export class PromiseWorkerLink extends ApolloLink {
  promiseWorker: PromiseWorker
  constructor({ worker }: { worker: Worker }) {
    super()
    this.promiseWorker = new PromiseWorker(worker)
  }
  request(operation: Operation) {
    return new Observable<any>((observer) => {
      this.promiseWorker
        .postMessage(operation)
        .then((data) => {
          observer.next(data)
          observer.complete()
        })
        .catch(observer.error.bind(observer))
    })
  }
}
