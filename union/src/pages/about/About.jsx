import { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  return (
    <div className="mainAbout">
      <ToastContainer />
      <h1 className="titlePageAbout"> Nuestra Misión</h1>

      <section className="presentation">
        <p>
          En Union, nos dedicamos a revolucionar la gestión de las finanzas
          personales y empresariales. Nuestra misión es simplificar y
          automatizar el proceso financiero, proporcionando herramientas
          poderosas y fáciles de usar que ayuden a nuestros usuarios a tomar
          decisiones financieras informadas y eficaces. Nos esforzamos por
          empoderar a individuos y empresas para que alcancen sus objetivos
          financieros con confianza y claridad.
        </p>
        <h2>Nuestra Visión</h2>

        <p>
          Aspiramos a ser líderes globales en soluciones tecnológicas
          financieras, reconociendo la importancia de la salud financiera en la
          calidad de vida. Nuestra visión es crear un ecosistema financiero
          integrado que soporte desde el presupuesto personal hasta la
          planificación empresarial avanzada, todo accesible desde cualquier
          dispositivo, en cualquier momento y en cualquier lugar.
        </p>

        <p>
          Nuestra mayor pasión es destrozar las cuentas negativas y que tengas
          una mejor calidad de vida.
        </p>
        <h3>Únete a Nosotros</h3>
        <p>
          Si estás interesado en mejorar tu bienestar financiero o necesitas
          herramientas para gestionar mejor las finanzas de tu empresa, Union
          está aquí para ayudarte. Explora lo que Union puede hacer por ti hoy y
          toma el control de tu futuro financiero.
        </p>
      </section>
    </div>
  );
};

export default About;
