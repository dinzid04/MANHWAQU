import { Link } from "wouter";
import { BookOpen, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold">
                Manhwaku<span className="text-primary">-v1</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Platform terbaik untuk membaca manhwa gratis online. Nikmati koleksi lengkap manhwa
              terbaru, populer, dan rekomendasi terbaik.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Created by <span className="font-semibold text-foreground">Lannz</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" data-testid="link-footer-home" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/genres" data-testid="link-footer-genres" className="text-muted-foreground hover:text-foreground transition-colors">
                  Genre
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-2">
              <a
                href="#"
                className="p-2 rounded-lg hover-elevate active-elevate-2 transition-all"
                aria-label="GitHub"
                data-testid="link-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover-elevate active-elevate-2 transition-all"
                aria-label="Twitter"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg hover-elevate active-elevate-2 transition-all"
                aria-label="Email"
                data-testid="link-email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Manhwaku-v1. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
