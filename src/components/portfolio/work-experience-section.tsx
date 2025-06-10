// src/components/portfolio/work-experience-section.tsx
import { Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  emoji: string;
  tech?: string[];
}

const experiences: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Innovatech Solutions",
    period: "2021 - Present",
    description: "Lead developer for a new client-facing analytics dashboard. Spearheaded migration to a microservices architecture. Mentored a team of 3 junior developers, fostering a culture of continuous learning and growth.",
    emoji: "🌟",
    tech: ["React", "Node.js", "TypeScript", "GraphQL", "AWS", "Docker"]
  },
  {
    role: "Software Developer",
    company: "CodeGenius Co.",
    period: "2019 - 2021",
    description: "Developed and maintained features for a popular e-commerce platform. Contributed to improving API performance by 20%. Collaborated in an agile team to deliver high-quality software solutions.",
    emoji: "💻",
    tech: ["Vue.js", "Python (Django)", "PostgreSQL", "REST APIs"]
  },
  {
    role: "Junior Developer",
    company: "Web Wizards Inc.",
    period: "2017 - 2019",
    description: "Assisted in the development of various client websites and internal tools. Gained foundational experience in web development, version control, and agile methodologies. Enthusiastically tackled new challenges and learned new technologies.",
    emoji: "🛠️",
    tech: ["HTML", "CSS", "JavaScript", "jQuery", "PHP"]
  },
];

const WorkExperienceSection: React.FC = () => (
  <section id="work" className="py-16 md:py-24">
    <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary text-center mb-16">
      Work Experience <Briefcase className="inline-block ml-3 h-10 w-10" />
    </h2>
    <div className="space-y-12 max-w-3xl mx-auto">
      {experiences.map((exp, index) => (
        <div key={index} className="relative pl-10 group">
          <div className="absolute left-0 top-1 w-4 h-4 mt-1.5 bg-primary rounded-full border-4 border-background group-hover:bg-accent transition-colors duration-300 shadow-md"></div>
          <div className="absolute left-[0.4375rem] top-7 bottom-0 w-0.5 bg-border group-last:hidden"></div>
          
          <Card className="ml-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary group-hover:border-accent">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">{exp.role} <span role="img" aria-label="emoji">{exp.emoji}</span></CardTitle>
              <p className="font-body text-lg text-primary font-semibold">{exp.company}</p>
              <p className="font-body text-sm text-muted-foreground">{exp.period}</p>
            </CardHeader>
            <CardContent>
              <p className="font-body text-foreground/90 mb-3">{exp.description}</p>
              {exp.tech && exp.tech.length > 0 && (
                <div>
                  <h4 className="font-body text-sm font-semibold text-primary mb-1">Key Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span key={t} className="font-code text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full shadow-sm">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </section>
);

export default WorkExperienceSection;
