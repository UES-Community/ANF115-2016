import Link from "next/link";
import { 
  BookOpen, 
  ArrowRight, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar, 
  Layers, 
  DollarSign, 
  Award, 
  Percent, 
  ShieldCheck, 
  FileSpreadsheet,
  Activity
} from "lucide-react";
import { getAllLessons, getSections } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { InstallCommand } from "@/components/install-command";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function HomePage() {
  const lessons = getAllLessons();
  const sections = getSections();
  const firstLesson = lessons[0];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-carbon text-bone font-sans selection:bg-soft-indigo selection:text-black">
        
        {/* Faint blueprint grid overlay background on main content pages */}
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none z-0" style={{ height: "1200px" }} />

        {/* Promo Banner */}
        <div className="relative z-10 w-full bg-soft-indigo py-2 px-4 text-center text-xs font-mono font-semibold text-black tracking-wide">
          <span>PLATAFORMA DOCENTE OFICIAL — SEMESTRE II-2026 // UNIVERSIDAD DE EL SALVADOR</span>
        </div>

        {/* Navigation Bar */}
        <header className="relative z-10 border-b border-iron bg-carbon/80 backdrop-blur-md sticky top-0">
          <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
            <div className="flex items-center gap-3 font-mono text-sm font-semibold tracking-tight text-white select-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-iron border border-slate-edge text-soft-indigo">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="uppercase">anf115-2016</span>
              <span className="text-ash font-normal text-xs">v2.0.0</span>
            </div>

            {/* Navigation Pills */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="#temario" className="rounded-navpills text-xs font-mono font-medium text-bone hover:text-soft-indigo px-3 py-1.5 transition-colors">
                TEMARIO
              </Link>
              <Link href="#kpis" className="rounded-navpills text-xs font-mono font-medium text-bone hover:text-soft-indigo px-3 py-1.5 transition-colors">
                METRICAS
              </Link>
              <Link href="/autor" className="rounded-navpills text-xs font-mono font-medium text-bone hover:text-soft-indigo px-3 py-1.5 transition-colors">
                AUTOR
              </Link>
            </nav>

            {/* Nav CTA Group */}
            <div className="flex items-center gap-4">
              <Link href="/curso/introduccion" className="text-sm font-medium text-ash hover:text-white transition-colors">
                Iniciar Sesión
              </Link>
              {firstLesson && (
                <Button size="sm" asChild>
                  <Link href={`/curso/${firstLesson.slug}`} className="cursor-pointer">
                    Estudiar
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 mx-auto max-w-[1200px] px-6 py-16 md:py-24 space-y-24">
          
          <div className="grid gap-12 md:grid-cols-12 items-center">
            {/* Left Column: Title, Description, CTAs */}
            <div className="md:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="inline-block font-mono text-xs text-ash tracking-[0.85px] uppercase">
                  ESCUELA DE INGENIERÍA DE SISTEMAS INFORMÁTICOS // UES
                </span>
                <h1 className="text-display-sm md:text-display font-medium leading-[1.13] tracking-[-2.3px] text-white">
                  Análisis Financiero para el Desarrollo.
                </h1>
                <p className="max-w-[480px] text-base leading-relaxed text-ash">
                  Herramientas cuantitativas y analíticas aplicadas a la evaluación financiera y planificación estratégica empresarial. Diseñado para la ingeniería moderna.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {firstLesson && (
                  <Button asChild>
                    <Link href={`/curso/${firstLesson.slug}`} className="px-6 h-10 text-sm font-semibold cursor-pointer">
                      Comenzar Lectura
                    </Link>
                  </Button>
                )}
                <Button variant="outline" asChild>
                  <Link href="#temario" className="px-6 h-10 text-sm font-semibold cursor-pointer">
                    Ver Plan de Estudios
                  </Link>
                </Button>
              </div>

              {/* Install and CLI section */}
              <div className="space-y-3 pt-4">
                <p className="text-[10px] font-mono tracking-widest text-ash uppercase font-semibold">
                  REQUERIMIENTOS DEL CURSO
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-ash/80">
                  <span className="flex items-center gap-1.5"><FileSpreadsheet className="h-3.5 w-3.5 text-soft-indigo" /> Balances Financieros</span>
                  <span className="text-smoke">•</span>
                  <span className="flex items-center gap-1.5"><Percent className="h-3.5 w-3.5 text-soft-indigo" /> Indicadores de Rentabilidad</span>
                  <span className="text-smoke">•</span>
                  <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-soft-indigo" /> Pronósticos Pro Forma</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dashboard Preview Card */}
            <div className="md:col-span-5 bg-graphite border border-iron rounded-cards p-6 space-y-6">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-iron pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-soft-indigo animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-white tracking-tight">ANALISIS_RATIOS_2026.DAT</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-tags bg-iron border border-slate-edge text-[9px] font-mono text-ash uppercase">
                    MODO_ESTADO
                  </span>
                  <span className="px-2 py-0.5 rounded-tags bg-soft-indigo/10 border border-soft-indigo/35 text-[9px] font-mono text-soft-indigo uppercase">
                    ACTIVO
                  </span>
                </div>
              </div>

              {/* Live Data Visual Mock (Multi-color chart bars for viz) */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-mono text-white uppercase font-bold">Margen Operativo y Rotación</h4>
                  <p className="text-[11px] text-ash">Evaluación de eficiencia y liquidez del ciclo corriente</p>
                </div>
                
                <div className="flex items-end justify-between h-24 pt-4 border-b border-iron pb-2">
                  <div className="flex flex-col items-center gap-1 w-[12%]">
                    <div className="w-full bg-soft-indigo rounded-t-[2px]" style={{ height: "45%" }} />
                    <span className="text-[9px] font-mono text-ash">Q1</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-[12%]">
                    <div className="w-full bg-soft-indigo rounded-t-[2px]" style={{ height: "65%" }} />
                    <span className="text-[9px] font-mono text-ash">Q2</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-[12%]">
                    <div className="w-full bg-soft-indigo/60 rounded-t-[2px]" style={{ height: "50%" }} />
                    <span className="text-[9px] font-mono text-ash">Q3</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-[12%]">
                    <div className="w-full bg-soft-indigo rounded-t-[2px]" style={{ height: "85%" }} />
                    <span className="text-[9px] font-mono text-ash">Q4</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-[12%]">
                    <div className="w-full bg-indigo-500 rounded-t-[2px]" style={{ height: "40%" }} />
                    <span className="text-[9px] font-mono text-ash">Q5</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-[12%]">
                    <div className="w-full bg-violet-500 rounded-t-[2px]" style={{ height: "70%" }} />
                    <span className="text-[9px] font-mono text-ash">Q6</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 w-[12%]">
                    <div className="w-full bg-purple-500 rounded-t-[2px]" style={{ height: "95%" }} />
                    <span className="text-[9px] font-mono text-ash">Q7</span>
                  </div>
                </div>
              </div>

              {/* Data Table Mockup */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono border-b border-iron pb-1 text-ash uppercase">
                  <span>Indicador Clave</span>
                  <span>Margen / Veces</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white">Razón Circulante</span>
                    <span className="text-soft-indigo font-semibold">2.1x</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white">Prueba de Ácido</span>
                    <span className="text-soft-indigo font-semibold">1.4x</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white">ROE (Retorno s/ Capital)</span>
                    <span className="text-white">18.4%</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-iron pt-4 flex items-center justify-between text-[10px] font-mono text-ash">
                <span>Último Diagnóstico: Rentable</span>
                <span>Datos Estáticos v2</span>
              </div>
            </div>
          </div>

          {/* Social Proof Strip */}
          <div className="border-t border-b border-iron py-6 space-y-4">
            <p className="text-[10px] font-mono tracking-widest text-ash text-center uppercase">
              RECONOCIMIENTO ACADÉMICO Y COMPATIBILIDAD INDUSTRIAL
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-xs font-mono text-ash font-medium">
              <span>UNIVERSIDAD DE EL SALVADOR</span>
              <span>•</span>
              <span>FACULTAD DE INGENIERÍA</span>
              <span>•</span>
              <span>DEPARTAMENTO DE SISTEMAS</span>
              <span>•</span>
              <span>FINANZAS EMPRESARIALES</span>
            </div>
          </div>

          {/* Stat Row */}
          <section id="kpis" className="py-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="font-mono text-xs text-ash tracking-[0.85px] uppercase">
                ESTADÍSTICAS GLOBALES
              </span>
              <h2 className="text-heading-lg font-medium text-white tracking-tight">
                Estructura del Curso en Cifras
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 text-center">
              {/* Stat 1 */}
              <div className="space-y-2 bg-graphite border border-iron p-6 rounded-cards">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[4px] bg-iron border border-slate-edge text-soft-indigo mb-2">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="text-display-sm font-medium text-white tracking-[-1.74px]">
                  4
                </div>
                <p className="text-sm font-medium text-white font-mono uppercase">Unidades Clave</p>
                <p className="text-xs text-ash leading-relaxed">
                  Desde conceptos básicos hasta la gestión activa del capital de trabajo.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2 bg-graphite border border-iron p-6 rounded-cards">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[4px] bg-iron border border-slate-edge text-soft-indigo mb-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-display-sm font-medium text-white tracking-[-1.74px]">
                  8
                </div>
                <p className="text-sm font-medium text-white font-mono uppercase">Temas Principales</p>
                <p className="text-xs text-ash leading-relaxed">
                  Apuntes desarrollados y diseñados para estudio autodidacta e interactivo.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-2 bg-graphite border border-iron p-6 rounded-cards">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[4px] bg-iron border border-slate-edge text-soft-indigo mb-2">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-display-sm font-medium text-white tracking-[-1.74px]">
                  4 U.V.
                </div>
                <p className="text-sm font-medium text-white font-mono uppercase">Unidades Valorativas</p>
                <p className="text-xs text-ash leading-relaxed">
                  Exigencia y rigor académico según el plan de estudios 2016 de la UES.
                </p>
              </div>
            </div>
          </section>

          {/* Repo Install Guide Section */}
          <section className="bg-graphite border border-iron rounded-cards p-8 space-y-6 max-w-3xl mx-auto">
            <div className="space-y-2">
              <span className="font-mono text-xs text-ash tracking-[0.85px] uppercase">
                GUÍA DE ENTORNO LOCAL
              </span>
              <h3 className="text-heading font-medium text-white tracking-tight">
                Ejecución Local de la Documentación
              </h3>
              <p className="text-sm text-ash leading-relaxed">
                Si deseas clonar esta plataforma, agregar apuntes personalizados o contribuir al repositorio estudiantil, utiliza los siguientes comandos de pnpm:
              </p>
            </div>
            <InstallCommand />
          </section>

          {/* Course Content Section */}
          <section id="temario" className="space-y-8 max-w-3xl mx-auto pt-6">
            <div className="text-center space-y-3">
              <span className="font-mono text-xs text-ash tracking-[0.85px] uppercase">
                CONTENIDO ACADÉMICO
              </span>
              <h2 className="text-heading-lg font-medium tracking-tight text-white">
                Unidades del Programa de Estudio
              </h2>
              <p className="text-sm text-ash">
                Accede a cada uno de los temas haciendo clic en los enlaces a continuación:
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-ash uppercase">
                    {"// UNIDAD: "}{section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          href={`/curso/${lesson.slug}`}
                          className="flex items-center justify-between rounded-cards bg-graphite border border-iron p-4 hover:bg-iron hover:border-slate-edge transition-all duration-150 group"
                        >
                          <div className="space-y-1">
                            <p className="font-semibold text-white group-hover:text-soft-indigo transition-colors">
                              {lesson.title}
                            </p>
                            <p className="text-xs text-ash">
                              {lesson.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-ash group-hover:text-soft-indigo group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-iron py-16 bg-carbon mt-24">
          <div className="mx-auto max-w-[1200px] px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Column 1: Platform */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Plataforma
              </h4>
              <ul className="space-y-3 text-xs font-mono">
                <li>
                  <Link href="/" className="text-ash hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#temario" className="text-ash hover:text-white transition-colors">
                    Plan de Estudios
                  </Link>
                </li>
                <li>
                  <Link href="/autor" className="text-ash hover:text-white transition-colors">
                    Autor del Sitio
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Unidades */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Unidades
              </h4>
              <ul className="space-y-3 text-xs font-mono">
                {sections.map((section) => (
                  <li key={section.id}>
                    <span className="text-ash uppercase truncate block">
                      {section.title.split("-")[0].trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Recursos */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Recursos
              </h4>
              <ul className="space-y-3 text-xs font-mono">
                <li>
                  <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-white transition-colors">
                    Next.js
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-white transition-colors">
                    Tailwind CSS
                  </a>
                </li>
                <li>
                  <a href="https://pnpm.io" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-white transition-colors">
                    pnpm Manager
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contacto */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Contacto
              </h4>
              <ul className="space-y-3 text-xs font-mono">
                <li>
                  <span className="text-ash">Soporte UES</span>
                </li>
                <li>
                  <span className="text-ash">Consultas FIA</span>
                </li>
                <li>
                  <a href="https://github.com/ues-community" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-white transition-colors">
                    Organización GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Explorar */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Explorar
              </h4>
              <ul className="space-y-3 text-xs font-mono">
                <li>
                  <span className="text-ash">Comunidad UES</span>
                </li>
                <li>
                  <span className="text-ash">Apuntes Libres</span>
                </li>
                <li>
                  <span className="text-soft-indigo font-bold">★ ANF115-2016</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mx-auto max-w-[1200px] px-6 border-t border-iron pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-ash">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>ANF115-2016 • Análisis Financiero • Universidad de El Salvador</span>
            </div>
            <div className="flex gap-4">
              <span>Next.js 15 App Router</span>
              <span>•</span>
              <span>Código Estilo Dovetail</span>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
