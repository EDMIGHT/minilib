import express from 'express';

import {
  createService,
  getServices,
  processingServiceReq,
  updateService,
} from '@/controllers/register.controllers';

const router = express.Router({ mergeParams: true });

router.get('/r', getServices);
router.post('/r', createService);
router.patch('/r/:serviceName', updateService);

router.get('/:serviceName*', processingServiceReq);

export default router;
