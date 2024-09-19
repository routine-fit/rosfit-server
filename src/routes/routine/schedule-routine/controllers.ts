import { Request, Response } from 'express';

// import { Prisma } from '@prisma/client';
import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, notFound } from 'src/utils/messages';

import { scheduleRoutineExerciseSelect } from './utils';

const getAllScheduleRoutines = async (req: Request, res: Response) => {
  const scheduleRoutines = await prisma.scheduleRoutine.findMany({
    select: scheduleRoutineExerciseSelect,
    where: {
      userId: req.firebaseUid,
      isActive: true,
    },
  });
  if (scheduleRoutines.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('Schedule routines', 'found'),
      data: scheduleRoutines,
      error: false,
    });
  }
  throw new CustomError(404, notFound('schedule routines'));
};

const createScheduleRoutine = async (req: Request, res: Response) => {
  const { routineId, day } = req.body;

  const createdScheduleRoutine = await prisma.scheduleRoutine.create({
    data: {
      routineId,
      day,
      userId: req.firebaseUid,
      isActive: true,
    },
    select: scheduleRoutineExerciseSelect,
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Schedule routine', 'created'),
    data: createdScheduleRoutine,
    error: false,
  });
};

export default {
  getAllScheduleRoutines,
  createScheduleRoutine,
};
