import { Component } from 'react';
import Button from '../ui/Button';

// Class component required by React's error boundary API — catches
// render errors in the subtree below and shows a recovery screen
// instead of a blank white page.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
          <h1 className="font-display text-2xl text-ink">Something broke on our end</h1>
          <p className="max-w-sm text-sm text-ink-muted">
            Try reloading the page. If this keeps happening, let us know through the contact form.
          </p>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
