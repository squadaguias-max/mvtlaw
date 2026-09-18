import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppShell({ children }) { return <div className="min-h-screen"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo">{children}</main><Footer /></div>; }
