import axios from 'axios';
import { Request, Response } from 'express';

import { CustomResponse } from '@/lib/custom-response';
import { serverErrorResponse } from '@/lib/server-error-response';
import { RegisterService } from '@/services/register.service';

export const getServices = async (_: Request, res: Response): Promise<Response> => {
  try {
    const services = await RegisterService.getAll();

    return CustomResponse.ok(res, services);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching services on server side',
      error,
    });
  }
};

export const processingServiceReq = async (req: Request, res: Response): Promise<Response> => {
  const { serviceName } = req.params;

  try {
    const existedService = await RegisterService.get(serviceName);

    if (!existedService) {
      return CustomResponse.notFound(res, {
        message: `service with name = ${serviceName} does not exist`,
      });
    }

    if (existedService.status === 'inactive') {
      return CustomResponse.badRequest(res, {
        message: `service with name = ${serviceName} does not work`,
      });
    }

    const query = req.url.replace(`/${existedService.name}`, '');
    const newUrlForReq = `${existedService.host}${query}`;

    const { data, status } = await axios({
      method: req.method,
      url: newUrlForReq,
      data: req.body,
      headers: req.headers,
    });

    return res.status(status).send(data);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: `server side error when fetching service with name = ${serviceName}`,
      error,
    });
  }
};

export const createService = async (req: Request, res: Response): Promise<Response> => {
  try {
    const existedService = await RegisterService.get(req.body.name);

    if (existedService) {
      return CustomResponse.conflict(res, {
        message: `service with name = ${existedService.name} already exist`,
      });
    }

    const service = await RegisterService.create(req.body);

    return CustomResponse.ok(res, service);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching services on server side',
      error,
    });
  }
};

export const updateService = async (req: Request, res: Response): Promise<Response> => {
  const { serviceName } = req.params;

  try {
    const existedService = await RegisterService.get(req.body.name);

    if (!existedService) {
      return CustomResponse.notFound(res, {
        message: `service with name = ${serviceName} does not exist`,
      });
    }

    const service = await RegisterService.update(serviceName, req.body);

    return CustomResponse.ok(res, service);
  } catch (error) {
    return serverErrorResponse({
      res,
      message: 'error while fetching services on server side',
      error,
    });
  }
};
