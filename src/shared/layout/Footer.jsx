import { Mail, MapPin, Phone } from "lucide-react";
import { templateConfig as site } from "../../config/template.config";
import { Wordmark } from "./Header";

export function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-brand"><Wordmark inverse /><p>Direito Imobiliário, Regularização de Imóveis e Direito Registral.</p></div>
        <div className="footer-contact">
          <a href={`mailto:${site.contact.email}`}><Mail aria-hidden="true" />{site.contact.email}</a>
          <a href={`tel:+${site.contact.phone}`}><Phone aria-hidden="true" />{site.contact.phoneLabel}</a>
          <span><MapPin aria-hidden="true" />{site.location.address}</span>
        </div>
        <nav aria-label="Navegação do rodapé">
          <a href="#inicio">Início</a><a href="#caminhos">Caminhos</a><a href="#modalidades">Modalidades</a><a href="#duvidas">Dúvidas</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} MVT Law Advocacia.</span>
        <p>Este material tem caráter meramente informativo e não constitui publicidade profissional nos termos do Provimento nº 205/2021 do CFOAB. As informações aqui veiculadas não garantem resultados específicos.</p>
      </div>
      <a className="developed-by" href="https://somos4juris.com.br/" target="_blank" rel="noopener noreferrer">Desenvolvido por 4Juris</a>
    </footer>
  );
}
