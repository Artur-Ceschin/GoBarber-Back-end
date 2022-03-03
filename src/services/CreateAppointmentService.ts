import { Appointment } from '../models/Appointments';
import { startOfHour } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

//Recebendo dados do service chamamos de Request
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentsServices {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInSameDate) {
      throw new Error('This is appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export { CreateAppointmentsServices };
