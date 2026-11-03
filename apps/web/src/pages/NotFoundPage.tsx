import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
      <div className="inline-flex p-4 rounded-full bg-muted text-primary">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-foreground">404 - Page Not Found</h1>
      <p className="text-sm text-muted-foreground">
        The page you are looking for doesn't exist or has moved.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

