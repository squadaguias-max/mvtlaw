import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { whatsappUrl } from "../../config/template.config";

export function Wordmark({ inverse = false }) {
  return (
    <span className={`wordmark${inverse ? " inverse" : ""}`} aria-label="MVT Law Advocacia">
      <strong>MVT LAW</strong><small>ADVOCACIA</small>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#inicio" className="brand" aria-label="MVT Law Advocacia - início"><Wordmark inverse /></a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</button>
        <nav id="main-nav" className={open ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#situacoes" onClick={close}>Situações</a>
          <a href="#usucapiao" onClick={close}>O que é</a>
          <a href="#caminhos" onClick={close}>Caminhos</a>
          <a href="#como-funciona" onClick={close}>Atendimento</a>
          <a href="#duvidas" onClick={close}>Dúvidas</a>
          <a className="nav-cta" href={whatsappUrl()} target="_blank" rel="noreferrer" onClick={close}><MessageCircle aria-hidden="true" /> WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
