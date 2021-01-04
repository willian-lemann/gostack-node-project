import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
   date: Date;
   provider_id: string;
}

class CreateAppointmentService {
   public async Execute({ provider_id, date }: Request): Promise<Appointment> {
      const appointmentsRepository = getCustomRepository(AppointmentsRepository);

      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = await appointmentsRepository.FindByDate(appointmentDate);

      if (findAppointmentInSameDate) {
         throw Error('This appointment has already been booked.');
      }

      const appointment = appointmentsRepository.create({
         provider_id,
         date: appointmentDate,
      });

      await appointmentsRepository.save(appointment);

      return appointment;
   }
}

export default CreateAppointmentService;
