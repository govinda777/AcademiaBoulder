import { 
  users, type User, type InsertUser,
  events, type Event, type InsertEvent,
  programs, type Program, type InsertProgram,
  schedules, type Schedule, type InsertSchedule,
  forumTopics, type ForumTopic, type InsertForumTopic,
  forumComments, type ForumComment, type InsertForumComment,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission
} from "@shared/schema";

// Define time slots
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

// Define available slots per time slot
const MAX_SLOTS_PER_TIME = 5;

// Interface for available time slots
interface AvailableSlot {
  time: string;
  available: boolean;
  spotsLeft: number;
}

// Interface for the storage system
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Programs
  getAllPrograms(): Promise<Program[]>;
  getProgramBySlug(slug: string): Promise<Program | undefined>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  
  // Scheduling
  createSchedule(schedule: InsertSchedule): Promise<Schedule>;
  getAvailableSlots(date: Date): Promise<AvailableSlot[]>;
  
  // Forum
  getAllForumTopics(): Promise<ForumTopic[]>;
  createForumTopic(topic: InsertForumTopic): Promise<ForumTopic>;
  getForumCommentsByTopicId(topicId: number): Promise<ForumComment[]>;
  createForumComment(comment: InsertForumComment): Promise<ForumComment>;
  
  // Contact
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private programs: Map<string, Program>;
  private events: Map<number, Event>;
  private schedules: Map<number, Schedule>;
  private forumTopics: Map<number, ForumTopic>;
  private forumComments: Map<number, ForumComment>;
  private contactSubmissions: Map<number, ContactSubmission>;
  
  private userId: number;
  private scheduleId: number;
  private topicId: number;
  private commentId: number;
  private submissionId: number;

  constructor() {
    this.users = new Map();
    this.programs = new Map();
    this.events = new Map();
    this.schedules = new Map();
    this.forumTopics = new Map();
    this.forumComments = new Map();
    this.contactSubmissions = new Map();
    
    this.userId = 1;
    this.scheduleId = 1;
    this.topicId = 1;
    this.commentId = 1;
    this.submissionId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // Initialize sample data for demonstration
  private initializeSampleData() {
    // Sample programs
    const samplePrograms: Program[] = [
      {
        id: 1,
        slug: "escalada",
        title: "Escalada Esportiva",
        description: "Desenvolva habilidades técnicas de escalada com nosso currículo estruturado em 5 níveis.",
        fullDescription: "Nosso programa de Escalada Esportiva é projetado para desenvolver escaladores completos, combinando técnica, força, resistência e mentalidade. Com uma metodologia progressiva, você avançará por níveis claramente definidos, cada um com objetivos específicos e habilidades mensuráveis.",
        image: "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        progress: 80,
        progressLabel: "Nível 4 de 5",
        features: [
          "Técnicas fundamentais de movimento",
          "Estratégias de solução de problemas",
          "Avaliação de progresso mensal"
        ],
        levels: [
          {
            level: "Nível 1 - Fundamentos",
            description: "Introdução às técnicas básicas de escalada e segurança.",
            skills: ["Posicionamento corporal", "Técnicas de pega", "Leitura básica de vias", "Quedas seguras"]
          },
          {
            level: "Nível 2 - Desenvolvimento",
            description: "Aprimoramento das técnicas e introdução a movimentos intermediários.",
            skills: ["Técnicas de pés", "Escalada dinâmica básica", "Conservação de energia", "Estratégias simples"]
          },
          {
            level: "Nível 3 - Intermediário",
            description: "Foco em eficiência e variedade de técnicas em diferentes terrenos.",
            skills: ["Movimentos dinâmicos", "Escalada em teto", "Leitura avançada de vias", "Técnicas de respiração"]
          },
          {
            level: "Nível 4 - Avançado",
            description: "Domínio de técnicas avançadas e treinamento de força específica.",
            skills: ["Movimentos de coordenação", "Técnicas de bloqueio", "Escalada em volumes", "Periodização de treino"]
          },
          {
            level: "Nível 5 - Elite",
            description: "Preparação para competições e escalada de alto nível.",
            skills: ["Técnicas de competição", "Movimentos complexos", "Estratégia avançada", "Preparação mental"]
          }
        ],
        instructors: [
          {
            name: "Marcelo Santos",
            role: "Instrutor Chefe",
            bio: "Atleta IFSC com 15 anos de experiência e especialista em pedagogia esportiva.",
            image: "https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
          },
          {
            name: "Camila Rocha",
            role: "Instrutora Avançada",
            bio: "Ex-atleta olímpica e especialista em treinamento de alta performance.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
          }
        ],
        schedule: {
          days: "Segunda, Quarta e Sexta",
          times: "07:00, 10:00, 16:00 e 19:00",
          duration: "1h30 por sessão"
        },
        pricing: {
          monthly: "R$ 350,00",
          quarterly: "R$ 950,00",
          annual: "R$ 3.500,00"
        },
        createdAt: new Date()
      },
      {
        id: 2,
        slug: "crosstraining",
        title: "Cross Training",
        description: "Programa de condicionamento físico especializado para escaladores com periodização.",
        fullDescription: "O Cross Training para escaladores é um programa de condicionamento físico especializado que foca no desenvolvimento de força, resistência, mobilidade e prevenção de lesões específicas para as demandas da escalada. Utilizamos uma abordagem periodizada para maximizar seus ganhos e evitar platôs.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        progress: 60,
        progressLabel: "Fase 3 de 5",
        features: [
          "Força específica para escalada",
          "Mobilidade e prevenção de lesões",
          "Integração com wearables"
        ],
        levels: [
          {
            level: "Fase 1 - Avaliação e Base",
            description: "Avaliação inicial e construção de base de força e mobilidade.",
            skills: ["Avaliação biomecânica", "Correção postural", "Força básica de dedos", "Mobilidade de ombros"]
          },
          {
            level: "Fase 2 - Construção",
            description: "Desenvolvimento progressivo de força e endurance.",
            skills: ["Treinamento de antagonistas", "Força de core", "Resistência aeróbia", "Técnicas de recuperação"]
          },
          {
            level: "Fase 3 - Especialização",
            description: "Treinamento específico para demandas da escalada.",
            skills: ["Força específica de dedos", "Pulling power", "Resistência de antebraço", "Potência de pernas"]
          }
        ],
        instructors: [
          {
            name: "Felipe Almeida",
            role: "Preparador Físico",
            bio: "Fisioterapeuta esportivo e especialista em biomecânica da escalada.",
            image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
          }
        ],
        schedule: {
          days: "Terça, Quinta e Sábado",
          times: "08:00, 12:00, 18:00",
          duration: "1h por sessão"
        },
        pricing: {
          monthly: "R$ 300,00",
          quarterly: "R$ 800,00",
          annual: "R$ 3.000,00"
        },
        createdAt: new Date()
      },
      {
        id: 3,
        slug: "instrutores",
        title: "Formação de Instrutores",
        description: "Torne-se um instrutor certificado com nossa formação reconhecida nacionalmente.",
        fullDescription: "O programa de Formação de Instrutores da Academia Boulder é uma certificação completa para quem deseja atuar profissionalmente no ensino da escalada. Nosso curso abrange metodologias pedagógicas, técnicas avançadas, segurança, primeiros socorros e gestão de aulas, tudo com uma abordagem prática e teórica equilibrada.",
        image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        progress: 100,
        progressLabel: "Certificação",
        features: [
          "Metodologia de ensino",
          "Segurança e prevenção",
          "Programa de residência técnica"
        ],
        levels: [
          {
            level: "Módulo 1 - Fundamentos de Escalada",
            description: "Revisão e aprofundamento técnico das habilidades fundamentais.",
            skills: ["Técnica avançada", "Biomecânica", "Análise de movimento", "Auto-resgate básico"]
          },
          {
            level: "Módulo 2 - Pedagogia da Escalada",
            description: "Metodologias de ensino adaptadas para diferentes perfis de alunos.",
            skills: ["Princípios pedagógicos", "Planejamento de aulas", "Progressões didáticas", "Feedback efetivo"]
          }
        ],
        instructors: [
          {
            name: "Juliana Costa",
            role: "Coordenadora de Formação",
            bio: "Especialista em iniciação à escalada e formação de novos instrutores.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
          }
        ],
        schedule: {
          days: "Intensivo (3 meses) ou Extensivo (6 meses)",
          times: "Aulas aos finais de semana ou noturnas",
          duration: "200 horas totais (teóricas e práticas)"
        },
        pricing: {
          monthly: "R$ 1.200,00 (parcela)",
          quarterly: "R$ 3.400,00 (à vista)",
          annual: "R$ 5.500,00 (curso completo)"
        },
        createdAt: new Date()
      }
    ];
    
    // Add programs to map
    samplePrograms.forEach(program => {
      this.programs.set(program.slug, program);
    });
    
    // Sample events
    const sampleEvents: Event[] = [
      {
        id: 1,
        title: "Campeonato Regional de Boulder",
        description: "Competição aberta para escaladores de todos os níveis com categorias iniciante, intermediário e avançado.",
        fullDescription: "O Campeonato Regional de Boulder é a principal competição de escalada da região, reunindo atletas de todos os níveis. Com problemas desafiadores montados por route-setters experientes, os participantes terão a oportunidade de demonstrar suas habilidades técnicas, força e estratégia em um ambiente competitivo e amigável.",
        date: new Date("2023-07-21T09:00:00"),
        image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        location: "Academia Boulder - Ginásio Principal",
        capacity: "120 competidores",
        price: "R$ 120,00 (competidores) / R$ 20,00 (espectadores)",
        categories: [
          {
            name: "Iniciante",
            requirements: "Até 1 ano de experiência em escalada",
            prizes: "Troféus + Kits de patrocinadores"
          },
          {
            name: "Intermediário",
            requirements: "1-3 anos de experiência em escalada",
            prizes: "Troféus + Prêmios em dinheiro (R$ 300, R$ 200, R$ 100)"
          }
        ],
        schedule: [
          {
            time: "08:00 - 09:00",
            activity: "Check-in e aquecimento para categoria iniciante"
          },
          {
            time: "09:00 - 12:00",
            activity: "Competição categoria iniciante"
          }
        ],
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Workshop de Técnicas Avançadas",
        description: "Aprenda técnicas avançadas de escalada com o atleta profissional Marco Aurelio.",
        fullDescription: "Neste workshop intensivo, o atleta profissional Marco Aurelio compartilhará técnicas avançadas de escalada que o ajudaram a conquistar pódios em competições internacionais.",
        date: new Date("2023-07-28T14:00:00"),
        image: "https://pixabay.com/get/g9cae84abe898d84f0774a2ebc16cbbf871447b22f57f92f7ae8fcffdf43d721c6e149ec69c93324bd6f53ac5aa20a4578e1d89281b4ad365d51f18f4139627c5_1280.jpg",
        location: "Academia Boulder - Sala de Treinamento",
        capacity: "20 participantes",
        price: "R$ 250,00",
        speakers: [
          {
            name: "Marco Aurelio",
            role: "Atleta Profissional",
            bio: "Marco Aurelio é atleta profissional de escalada com mais de 15 anos de experiência e diversos pódios em competições internacionais.",
            image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
          }
        ],
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Encontro da Comunidade",
        description: "Evento social para conectar escaladores, trocar experiências e escalar juntos.",
        fullDescription: "O Encontro da Comunidade é um evento social descontraído que reúne escaladores de todos os níveis para uma noite de networking, troca de experiências e, é claro, muita escalada!",
        date: new Date("2023-08-04T18:00:00"),
        image: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        location: "Academia Boulder - Área Social",
        capacity: "50 participantes",
        price: "R$ 50,00 (inclui entrada, um drink e buffet)",
        createdAt: new Date()
      }
    ];
    
    // Add events to map
    sampleEvents.forEach(event => {
      this.events.set(event.id, event);
    });
    
    // Sample forum topics
    const sampleForumTopics: ForumTopic[] = [
      {
        id: 1,
        title: "Dicas para superar platôs no treinamento",
        content: "Estou há três meses tentando progredir no nível intermediário mas sinto que estagnei. Alguém tem dicas para superar esse platô?",
        userId: 1,
        commentsCount: 3,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        id: 2,
        title: "Melhores exercícios para resistência de antebraço",
        content: "Quais são os exercícios mais eficientes para desenvolver resistência nos antebraços? Preciso melhorar isso para progredir nas vias mais longas.",
        userId: 2,
        commentsCount: 2,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        id: 3,
        title: "Indicação de equipamentos para iniciantes",
        content: "Estou começando agora e gostaria de recomendações de sapatilhas e outros equipamentos. O que é essencial para um iniciante?",
        userId: 3,
        commentsCount: 1,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      }
    ];
    
    // Add forum topics to map
    sampleForumTopics.forEach(topic => {
      this.forumTopics.set(topic.id, topic);
      this.topicId = Math.max(this.topicId, topic.id + 1);
    });
    
    // Sample forum comments
    const sampleForumComments: ForumComment[] = [
      {
        id: 1,
        topicId: 1,
        userId: 2,
        content: "Tente variar seus treinos e incluir exercícios específicos para os pontos fracos.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 2,
        topicId: 1,
        userId: 3,
        content: "Períodos de descanso são importantes também. Às vezes o corpo precisa se recuperar.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];
    
    // Add forum comments to map
    sampleForumComments.forEach(comment => {
      this.forumComments.set(comment.id, comment);
      this.commentId = Math.max(this.commentId, comment.id + 1);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = {
      id,
      username: userData.username,
      password: userData.password,
      email: userData.email || "",
      fullName: userData.fullName || "",
      phone: userData.phone || null,
      role: userData.role || "user",
      createdAt: new Date()
    };
    
    this.users.set(id, user);
    return user;
  }

  // Program methods
  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramBySlug(slug: string): Promise<Program | undefined> {
    return this.programs.get(slug);
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventById(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  // Scheduling methods
  async createSchedule(scheduleData: InsertSchedule): Promise<Schedule> {
    const id = this.scheduleId++;
    const schedule: Schedule = {
      id,
      userId: scheduleData.userId || null,
      name: scheduleData.name,
      email: scheduleData.email,
      phone: scheduleData.phone,
      experienceLevel: scheduleData.experienceLevel,
      date: scheduleData.date,
      time: scheduleData.time,
      scheduleType: scheduleData.scheduleType,
      status: "pending",
      createdAt: new Date()
    };
    
    this.schedules.set(id, schedule);
    return schedule;
  }

  async getAvailableSlots(date: Date): Promise<AvailableSlot[]> {
    // Calculate bookings per time slot for the given date
    const bookingsPerTime = new Map<string, number>();
    
    for (const schedule of this.schedules.values()) {
      if (schedule.date.toDateString() === date.toDateString()) {
        const time = schedule.time;
        bookingsPerTime.set(time, (bookingsPerTime.get(time) || 0) + 1);
      }
    }
    
    // Create available slots array
    return TIME_SLOTS.map(time => {
      const booked = bookingsPerTime.get(time) || 0;
      const spotsLeft = MAX_SLOTS_PER_TIME - booked;
      
      return {
        time,
        available: spotsLeft > 0,
        spotsLeft
      };
    });
  }

  // Forum methods
  async getAllForumTopics(): Promise<ForumTopic[]> {
    return Array.from(this.forumTopics.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createForumTopic(topicData: InsertForumTopic): Promise<ForumTopic> {
    const id = this.topicId++;
    const topic: ForumTopic = {
      id,
      title: topicData.title,
      content: topicData.content,
      userId: topicData.userId,
      commentsCount: 0,
      createdAt: new Date()
    };
    
    this.forumTopics.set(id, topic);
    return topic;
  }

  async getForumCommentsByTopicId(topicId: number): Promise<ForumComment[]> {
    const comments: ForumComment[] = [];
    
    for (const comment of this.forumComments.values()) {
      if (comment.topicId === topicId) {
        comments.push(comment);
      }
    }
    
    return comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createForumComment(commentData: InsertForumComment): Promise<ForumComment> {
    const id = this.commentId++;
    const comment: ForumComment = {
      id,
      topicId: commentData.topicId,
      userId: commentData.userId,
      content: commentData.content,
      createdAt: new Date()
    };
    
    this.forumComments.set(id, comment);
    
    // Update comment count on topic
    const topic = this.forumTopics.get(commentData.topicId);
    if (topic) {
      topic.commentsCount += 1;
      this.forumTopics.set(topic.id, topic);
    }
    
    return comment;
  }

  // Contact methods
  async createContactSubmission(submissionData: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.submissionId++;
    const submission: ContactSubmission = {
      id,
      name: submissionData.name,
      email: submissionData.email,
      subject: submissionData.subject,
      message: submissionData.message,
      status: "new",
      createdAt: new Date()
    };
    
    this.contactSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
