import React, { useEffect, useRef } from "react";
import Navbar from "./components/navbar/Navbar";
import * as Blockly from "blockly";
import * as BlocklyJS from "blockly/javascript"; // ✅ import correcto
import "./css/Libre.css";




const Libre = () => {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (blocklyDiv.current) {
      const toolbox = `
        <xml xmlns="https://developers.google.com/blockly/xml">
          <category name="Control" colour="#5C81A6">
            <block type="controls_if"></block>
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
            <block type="controls_whileUntil"></block>
            <block type="controls_for"></block>
            <block type="controls_flow_statements"></block>
          </category>
          <category name="Lógica" colour="#5CA65C">
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
            <block type="logic_null"></block>
          </category>
          <category name="Matemáticas" colour="#5C68A6">
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
            <block type="math_single"></block>
            <block type="math_trig"></block>
            <block type="math_constant"></block>
            <block type="math_number_property"></block>
            <block type="math_round"></block>
            <block type="math_on_list"></block>
            <block type="math_modulo"></block>
            <block type="math_constrain"></block>
            <block type="math_random_int"></block>
            <block type="math_random_float"></block>
          </category>
          <category name="Texto" colour="#5CA6A6">
            <block type="text"></block>
            <block type="text_join"></block>
            <block type="text_append">
              <value name="TEXT">
                <shadow type="text"></shadow>
              </value>
            </block>
            <block type="text_length"></block>
            <block type="text_isEmpty"></block>
            <block type="text_indexOf"></block>
            <block type="text_charAt"></block>
            <block type="text_getSubstring"></block>
            <block type="text_changeCase"></block>
            <block type="text_trim"></block>
            <block type="text_print"></block>
            <block type="text_prompt_ext">
              <value name="TEXT">
                <shadow type="text"></shadow>
              </value>
            </block>
          </category>
          <category name="Listas" colour="#745CA6">
            <block type="lists_create_with"></block>
            <block type="lists_repeat"></block>
            <block type="lists_length"></block>
            <block type="lists_isEmpty"></block>
            <block type="lists_indexOf"></block>
            <block type="lists_getIndex"></block>
            <block type="lists_setIndex"></block>
            <block type="lists_getSublist"></block>
            <block type="lists_split"></block>
            <block type="lists_sort"></block>
          </category>
          <category name="Variables" custom="VARIABLE" colour="#A65C81"></category>
          <category name="Funciones" custom="PROCEDURE" colour="#9A5CA6"></category>
        </xml>
      `;

      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox,
      });
    }
  }, []);

  const runCode = () => {
    const outputElement = document.getElementById("output-box");
  
    // Generar código desde el workspace de Blockly
    const code = BlocklyJS.javascriptGenerator.workspaceToCode(workspaceRef.current);
  
    // Mostrar el código generado primero
    outputElement.textContent = "📜 Código generado:\n" + code + "\n\n💬 Salida:\n";
  
    try {
      const originalLog = console.log;
      console.log = (msg) => {
        outputElement.textContent += msg + "\n";
      };
  
      eval(code); // ⚠️ Eval con precaución
  
      console.log = originalLog;
    } catch (err) {
      outputElement.textContent += `❌ Error: ${err}`;
    }
  };

  const saveProject = () => {
    if (!workspaceRef.current) return;
  
    const xml = Blockly.Xml.workspaceToDom(workspaceRef.current);
    const xmlText = Blockly.Xml.domToPrettyText(xml);
  
    // Crear un archivo y descargarlo
    const blob = new Blob([xmlText], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mi_proyecto_blockly.xml";
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const loadProject = (event) => {
    const file = event.target.files[0];
    if (!file || !workspaceRef.current) {
      alert("❌ Workspace no disponible todavía.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const xmlText = e.target.result;
        console.log("📥 XML cargado:", xmlText);
    
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");
    
        Blockly.Xml.clearWorkspaceAndLoadFromXml(xml.documentElement, workspaceRef.current);
    
        // 👇 Centra los bloques correctamente
        Blockly.svgResize(workspaceRef.current);
        workspaceRef.current.scrollCenter();
        workspaceRef.current.zoomToFit();
    
        alert("✅ Proyecto cargado correctamente");
      } catch (error) {
        alert("⚠️ Error al cargar el archivo. Revisa la consola.");
        console.error(error);
      }
    };
    
  
    reader.readAsText(file);
  };
  
  
  
  
  

  return (
    <div className="home-container">
      <Navbar />

      <div className="modo-libre-container">
        <div className="bloques-panel">
          <h3>Modo libre</h3>
        </div>
        <div className="workspace-panel" ref={blocklyDiv}></div>

        <div className="output-panel">
          <div className="output-box" id="output-box">
            {/* Aquí ya no hay <p>, directamente es editable */}
          </div>
          <button className="play-button" onClick={runCode}>
            ▶ Ejecutar
          </button>
         <div className="project-buttons">
  <button className="save-button" onClick={saveProject}>
    💾 Guardar Proyecto
  </button>
  <button className="load-button" onClick={() => document.getElementById('fileInput').click()}>
    📂 Cargar Proyecto
  </button>
  <input
    type="file"
    id="fileInput"
    accept=".xml"
    style={{ display: "none" }}
    onChange={loadProject}
  />
</div>

        </div>
      </div>
    </div>
  );
};

export default Libre;
