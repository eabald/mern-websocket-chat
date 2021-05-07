import session from 'express-session';

type ExpressSession = session.Session & Partial<session.SessionData>;

interface Session extends ExpressSession {
  watchingPayments: string[];
}

export default Session;
