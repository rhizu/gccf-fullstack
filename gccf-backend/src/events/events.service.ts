import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create(createEventDto);
    return await this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventsRepository.find({
      order: { eventDate: 'DESC' },
    });
  }

  async findCompleted(): Promise<Event[]> {
    return await this.eventsRepository.find({
      where: { status: 'completed' },
      order: { eventDate: 'DESC' },
    });
  }

  async findUpcoming(): Promise<Event[]> {
    return await this.eventsRepository.find({
      where: { status: 'upcoming' },
      order: { eventDate: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async findBySlug(slug: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { slug } });
    if (!event) {
      throw new NotFoundException(`Event with slug ${slug} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventsRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.eventsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}