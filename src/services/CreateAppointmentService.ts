import { Appointment } from '../models/Appointments';
import { startOfHour } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

//Recebendo dados do service chamamos de Request
interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentsServices {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate =
      this.appointmentsRepository.findByDate(date);

    if (findAppointmentsInSameDate) {
      throw new Error('This is appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export { CreateAppointmentsServices };
