import { Request, Response } from 'express';
import { Day, Prisma } from '@prisma/client';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

import { scheduleRoutineSelect } from './utils';

const getAllScheduleRoutines = async (req: Request, res: Response) => {
  const { day } = req.query;

  const whereClause: Prisma.ScheduleRoutineWhereInput = {
    userId: req.firebaseUid,
    isActive: true,
  };

  if (day) {
    whereClause.day = (day as string).toUpperCase() as Day;
  }

  const scheduleRoutines = await prisma.scheduleRoutine.findMany({
    where: whereClause,
    select: scheduleRoutineSelect,
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

  const existingScheduleRoutine = await prisma.scheduleRoutine.findFirst({
    where: {
      routineId,
      day,
      userId: req.firebaseUid,
      isActive: true,
    },
  });

  if (existingScheduleRoutine) {
    return res.status(400).json({
      message: 'A schedule routine with the same routineId and day already exists',
      data: existingScheduleRoutine,
      error: true,
    });
  }

  const createdScheduleRoutine = await prisma.scheduleRoutine.create({
    data: {
      routineId,
      day,
      userId: req.firebaseUid,
      isActive: true,
    },
    select: scheduleRoutineSelect,
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Schedule routine', 'created'),
    data: createdScheduleRoutine,
    error: false,
  });
};

const deleteScheduleRoutine = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const scheduleRoutine = await prisma.scheduleRoutine.findUnique({
    where: { id },
  });

  if (!scheduleRoutine) {
    throw new CustomError(404, notFound('Schedule routine'));
  }

  const summaryRoutines = await prisma.summaryRoutine.findMany({
    where: {
      userId: req.firebaseUid,
      scheduleRoutineId: scheduleRoutine.id,
    },
  });

  let deletedRoutine;

  if (summaryRoutines.length === 0) {
    deletedRoutine = await prisma.scheduleRoutine.delete({
      where: { id },
      select: scheduleRoutineSelect,
    });
  } else {
    deletedRoutine = await prisma.scheduleRoutine.update({
      where: { id },
      data: {
        isActive: false,
      },
      select: scheduleRoutineSelect,
    });
  }

  return res.status(200).json({
    message: getActionSuccessMsg('Schedule routine', 'deleted'),
    data: deletedRoutine,
    error: false,
  });
};

export default {
  getAllScheduleRoutines,
  createScheduleRoutine,
  deleteScheduleRoutine,
};
