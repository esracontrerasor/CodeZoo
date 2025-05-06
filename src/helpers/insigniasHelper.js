export const mostrarInsignia = (insignia) => {
    const username = localStorage.getItem("username");
    if (!username) return;
  
    const data = JSON.parse(localStorage.getItem("logrosPorUsuario")) || {};
    const logros = data[username] || [];
  
    const yaTiene = logros.find(i => i.nombre === insignia.nombre);
    if (!yaTiene) {
      logros.push(insignia);
      data[username] = logros;
      localStorage.setItem("logrosPorUsuario", JSON.stringify(data));
    }
  };
  
  export const obtenerInsigniasUsuario = () => {
    const username = localStorage.getItem("username");
    if (!username) return [];
    
    const data = JSON.parse(localStorage.getItem("logrosPorUsuario")) || {};
    return data[username] || [];
  };
  