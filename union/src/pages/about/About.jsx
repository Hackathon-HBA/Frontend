import { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const About = () => {

  return (
    <div className="mainAbout">
      <ToastContainer />
      <h1 className="titlePageAbout"> Repartiendo desde 2023</h1>

      <section className="presentation">
        <p>
          ¡Bienvenidos al caótico circo de la verdad! Somos tu dosis diaria de
          noticias sin pelos en la lengua. Olvídate del aburrimiento, aquí las
          historias son más picantes que tus chismes de vecindario. Sin filtros,
          sin censura, somos la inyección de realidad que necesitas. ¡Prepárate
          para el desmadre informativo que solo nosotros te ofrecemos!
        </p>


        <p>Nuestra mayor pasión es destrozar la realidad hasta que solo queden risas y la triste verdad para que tu puedas tomar tus puñeteras conclusiones mientras honras a Roca.</p>

        <p>
          Conoce a nuestros pícaros developers, el dúo dinámico y su genio
          diminuto. Dos colosos del código que creen que miden en líneas de
          programación y un pequeño maestro que les enseña que el tamaño no
          importa en el reino del desarrollo. Entre risas, tacos y líneas de
          código traviesas, estos tres son la mezcla perfecta de travesuras y
          talento. ¡En este circo de noticias, hasta nuestros developers son
          parte del show!
        </p>
      </section>
    </div>
  );
};

export default About;