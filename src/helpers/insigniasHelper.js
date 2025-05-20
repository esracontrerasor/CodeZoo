import swal from "sweetalert2";

export const mostrarInsignia = async (insignia) => {
  const username = localStorage.getItem("username");
  if (!username) {
    console.warn("⚠️ No hay username en localStorage");
    return;
  }

  console.log("🏅 MOSTRANDO INSIGNIA PARA:", username);
  console.log("📦 Datos:", insignia);

  const historial = JSON.parse(localStorage.getItem("insignias")) || [];
  if (!historial.some(i => i.nombre === insignia.nombre)) {
    localStorage.setItem("insignias", JSON.stringify([...historial, insignia]));
    console.log("💾 Insignia guardada en localStorage");
  } else {
    console.log("⚠️ Ya se tenía esta insignia en localStorage");
  }

  try {
    const res = await fetch(`https://backend-codezoo.onrender.com/api/insignias/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(insignia)
    });

    const body = await res.json();
    console.log("✅ Respuesta del backend:", body);
  } catch (error) {
    console.error("❌ Error al guardar en MongoDB:", error);
  }

  await swal.fire({
    title: `¡Ganaste una insignia: ${insignia.nombre}!`,
    text: insignia.descripcion,
    imageUrl: insignia.imagenUrl,
    imageWidth: 100,
    imageHeight: 100,
    icon: "success",
    confirmButtonText: "Ir al perfil",
    showCancelButton: true,
    cancelButtonText: "Cerrar"
  }).then((res) => {
    if (res.isConfirmed) {
      window.location.href = "/perfil";
    }
  });
};

  