// src/components/portfolio/contact-section.tsx
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactSection: React.FC = () => (
  <section id="contact" className="py-16 md:py-24 bg-card rounded-lg my-12 shadow-xl">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-8">
        Let's Connect <span role="img" aria-label="speech bubble">💬</span>
      </h2>
      <p className="font-body text-lg md:text-xl max-w-xl mx-auto text-foreground/80 mb-12">
        Whether you have a project idea, a question, or just want to say hi, my inbox is always open!
      </p>
      <div className="flex justify-center space-x-6 mb-16">
        <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-accent">
          <a href="mailto:john.doe@example.com" aria-label="Email John Doe">
            <Mail className="mr-2 h-5 w-5" /> Email
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-accent">
          <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" aria-label="John Doe on LinkedIn">
            <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-accent">
          <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" aria-label="John Doe on GitHub">
            <Github className="mr-2 h-5 w-5" /> GitHub
          </a>
        </Button>
      </div>

      <div className="max-w-lg mx-auto bg-background p-6 sm:p-8 rounded-md shadow-inner border">
        <h3 className="font-headline text-2xl text-accent mb-6">Send a Quick Message <span role="img" aria-label="envelope">📨</span></h3>
        <form action="#" method="POST" className="space-y-6 text-left">
          <div>
            <Label htmlFor="name" className="font-body text-sm font-medium text-primary">Full Name</Label>
            <Input type="text" name="name" id="name" placeholder="Your Name" className="font-body mt-1" />
          </div>
          <div>
            <Label htmlFor="email" className="font-body text-sm font-medium text-primary">Email Address</Label>
            <Input type="email" name="email" id="email" placeholder="your.email@example.com" className="font-body mt-1" />
          </div>
          <div>
            <Label htmlFor="message" className="font-body text-sm font-medium text-primary">Message</Label>
            <Textarea name="message" id="message" rows={4} placeholder="Your thoughts, project ideas, or greetings!" className="font-body mt-1" />
          </div>
          <div>
            <Button type="submit" className="w-full font-headline bg-primary hover:bg-accent text-primary-foreground py-3 text-base">
              <Send className="mr-2 h-5 w-5" /> Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  </section>
);

export default ContactSection;
