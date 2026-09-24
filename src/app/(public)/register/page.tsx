"use client"

import React, { useState, useRef } from "react"
import { 
  Compass, Trophy, Sparkles, Gamepad2, ArrowRight, ArrowLeft, 
  Upload, Trash2, CheckCircle2, Globe, Lock, Star, Edit3, 
  Youtube, MessageSquare, Twitter, Instagram, Disc as Discord, Shield, Check
} from "lucide-react"

const COUNTRIES = [
  { code: "BR", name: "Brasil" },
  { code: "PT", name: "Portugal" },
  { code: "US", name: "Estados Unidos" },
  { code: "CA", name: "Canadá" },
  { code: "UK", name: "Reino Unido" },
  { code: "AR", name: "Argentina" },
  { code: "MX", name: "México" },
  { code: "JP", name: "Japão" },
  { code: "DE", name: "Alemanha" },
  { code: "FR", name: "França" }
]

const DEFAULT_AVATARS = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdBOXsJzL8oyLPJR2wv3bL-Sm_dKyiZmDkcIwN81Yoqg&s=10=150&auto=format&fit=crop&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-Ee3zA2yudYE1AwsliSu6Pr_xnKee1D4ben-r4OiRg&s=10=150&auto=format&fit=crop&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8msbY5hbtX7SFGd2MY4-Ys0rgwlub8tr09FSRVp6mDw&s=10=150&auto=format&fit=crop&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSarVg-O4iPavNfxH1NK7u4h2bs6WA6rfveCQL0qzRT_w&s=10=150&auto=format&fit=crop&q=80"
]

export default function OnboardingFlow() {
  const [step, setStep] = useState(1) // 1: Identidade, 2: Estilo, 3: Primeiro Level, 4: Resumo Final
  const [direction, setDirection] = useState("forward")

  // Estado do Onboarding
  const [formData, setFormData] = useState({
    avatar: null,
    displayName: "",
    country: "Brasil",
    socials: {
      youtube: "",
      discord: "",
      twitch: "",
      instagram: "",
      twitter: "",
      steam: ""
    },
    playerStyle: "entusiasta" // 'casual' | 'entusiasta' | 'tryhard'
  })

  const [errors, setErrors] = useState({})
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const fileInputRef = useRef(null)

  // Manipulador de upload de avatar
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size >= 1 * 1024 * 1024) {
        setErrors({ ...errors, avatar: "A imagem deve ter menos de 1 MB." })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result })
        setErrors({ ...errors, avatar: null })
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleTheme = () => {
  document.documentElement.classList.toggle("dark")
}

  const nextStep = () => {
    if (step === 1 && !formData.displayName.trim()) {
      setErrors({ ...errors, displayName: "Por favor, insira seu nome de exibição." })
      return
    }
    setDirection("forward")
    setStep((prev) => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setDirection("backward")
    setStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="w-full min-h-[100dvh] bg-background text-foreground flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans selection:bg-primary/30 selection:text-primary-200">
      <div className="w-full max-w-4xl bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative backdrop-blur-xl">
        
        {}
        <div className="w-full px-6 pt-6 pb-4 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-primary uppercase">Onboarding da Jornada</span>
              <h2 className="text-sm font-medium text-foreground">
                {step === 1 && "Etapa 1: Sua Identidade"}
                {step === 2 && "Etapa 2: Estilo de Jogador"}
                {step === 3 && "Etapa 3: Seu Primeiro Level"}
                {step === 4 && "Conclusão da Jornada"}
              </h2>
            </div>
          </div>
          
        <button
            onClick={toggleTheme}
            title="Alternar tema claro/escuro"
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground transition-all flex items-center justify-center cursor-pointer"
            >
            <span className="text-xs font-semibold">Mudar Tema</span>
        </button>

          <div className="flex items-center gap-2">
            <div className="text-xs font-semibold text-popover-foreground mr-2">
              Passo {step} de 4
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === step 
                      ? "w-8 bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]" 
                      : i < step 
                      ? "w-2 bg-primary/40" 
                      : "w-2 bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto max-h-[calc(100dvh-160px)]">
          {step === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                  Antes de começar sua jornada...
                </h1>
                <p className="text-sm sm:text-base text-popover-foreground font-light">
                  Vamos criar a identidade que vai representar você por aqui.
                </p>
              </div>

              {/* Avatar Upload Section */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  Foto de Perfil (Opcional)
                </label>
                <p className="text-[11px] text-muted-foreground -mt-1">Recomendado: 512 × 512 px • JPG, PNG ou WEBP</p>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-2 border-border bg-secondary overflow-hidden flex items-center justify-center shadow-md">
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="Avatar preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-muted-foreground">
                          {formData.displayName ? formData.displayName.charAt(0).toUpperCase() : "?"}
                        </span>
                      )}
                    </div>
                    {formData.avatar && (
                      <button
                        onClick={() => setFormData({ ...formData, avatar: null })}
                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
                        title="Remover imagem"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary border border-border text-xs font-medium text-secondary-foreground transition-all flex items-center gap-2"
                    >
                      <Upload className="w-3.5 h-3.5 text-primary" />
                      Carregar Imagem
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                      className="px-4 py-2.5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/60 text-xs font-medium text-foreground/80 transition-all"
                    >
                      Escolher Padrão
                    </button>
                    {formData.avatar && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: null })}
                        className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-medium text-red-400 transition-all"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>

                {showAvatarSelector && (
                  <div className="p-4 rounded-xl bg-background/60 border border-border flex items-center gap-3 animate-fadeIn">
                    <span className="text-xs text-popover-foreground">Avatares recomendados:</span>
                    <div className="flex gap-2">
                      {DEFAULT_AVATARS.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Avatar ${index + 1}`}
                          onClick={() => {
                            setFormData({ ...formData, avatar: url })
                            setShowAvatarSelector(false)
                          }}
                          className="w-10 h-10 rounded-full cursor-pointer border border-border hover:border-primary object-cover transition-all"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {errors.avatar && <p className="text-xs text-red-400">{errors.avatar}</p>}
                <p className="text-[11px] text-muted-foreground font-light">
                  Recomendado imagem quadrada em JPG, PNG ou WEBP (máx. 1 MB).
                </p>
              </div>

              {/* Display Name and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                    Nome de Exibição <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => {
                      setFormData({ ...formData, displayName: e.target.value })
                      if (errors.displayName) setErrors({ ...errors, displayName: null })
                    }}
                    placeholder="Ex: Diego Gamer"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground"
                  />
                  {errors.displayName && <p className="text-xs text-red-400">{errors.displayName}</p>}
                  <p className="text-[11px] text-foreground font-light">É assim que você será conhecido dentro da plataforma.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                    País
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.name} className="bg-secondary text-foreground">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-muted-foreground font-light">De onde você acompanha sua jornada gamer?</p>
                </div>
              </div>

              {/* Social Links Optional Section */}
              <div className="space-y-3 pt-2">
                <div>
                  <h3 className="text-sm font-semibold text-secondary-foreground">Quer deixar suas outras jornadas por aqui também?</h3>
                  <p className="text-xs text-popover-foreground font-light">Adicione links externos opcionais para que outras pessoas possam encontrar você.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                      <Youtube className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="YouTube canal ou perfil"
                      value={formData.socials.youtube}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, youtube: e.target.value } })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                      <Discord className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Discord tag ou link"
                      value={formData.socials.discord}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, discord: e.target.value } })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                      <Twitter className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="X / Twitter perfil"
                      value={formData.socials.twitter}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, twitter: e.target.value } })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">
                      <Instagram className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Instagram perfil"
                      value={formData.socials.instagram}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                  Agora queremos conhecer seu jeito de jogar.
                </h1>
                <p className="text-sm sm:text-base text-popover-foreground font-light">
                  Não existe jeito certo ou errado de viver sua jornada. Escolha o perfil que mais combina com você.
                </p>
              </div>

              {/* Player Style Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Casual */}
                <div
                  onClick={() => setFormData({ ...formData, playerStyle: "casual" })}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    formData.playerStyle === "casual"
                      ? "bg-secondary border-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)] ring-1 ring-primary"
                      : "bg-background/60 border-border/80 hover:border-border"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                        Easy
                      </span>
                      {formData.playerStyle === "casual" && (
                        <span className="w-5 h-5 rounded-full bg-primary text-secondary-foreground flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Casual</h3>
                    <p className="text-xs text-foreground/80 leading-relaxed mb-4 font-light">
                      &ldquo;Jogo porque gosto. Quero registrar o que terminei, quando terminei e o que achei.&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 text-[11px] text-primary/90 font-medium">
                    &ldquo;Sem complicação. Só sua história nos games.&rdquo;
                  </div>
                </div>

                {/* Entusiasta */}
                <div
                  onClick={() => setFormData({ ...formData, playerStyle: "entusiasta" })}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    formData.playerStyle === "entusiasta"
                      ? "bg-secondary border-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)] ring-1 ring-primary"
                      : "bg-background/60 border-border/80 hover:border-border"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                        Normal
                      </span>
                      {formData.playerStyle === "entusiasta" && (
                        <span className="w-5 h-5 rounded-full bg-primary text-secondary-foreground flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Entusiasta</h3>
                    <p className="text-xs text-foreground/80 leading-relaxed mb-4 font-light">
                      &ldquo;Gosto de guardar um pouco mais da experiência. Às vezes escrevo review, acompanho conquistas e detalhes.&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 text-[11px] text-primary/90 font-medium">
                    &ldquo;Mais detalhes para quem gosta de lembrar de cada aventura.&rdquo;
                  </div>
                </div>

                {/* Tryhard */}
                <div
                  onClick={() => setFormData({ ...formData, playerStyle: "tryhard" })}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    formData.playerStyle === "tryhard"
                      ? "bg-secondary border-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)] ring-1 ring-primary"
                      : "bg-background/60 border-border/80 hover:border-border"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                        Hard
                      </span>
                      {formData.playerStyle === "tryhard" && (
                        <span className="w-5 h-5 rounded-full bg-primary text-secondary-foreground flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Tryhard</h3>
                    <p className="text-xs text-foreground/80 leading-relaxed mb-4 font-light">
                      &ldquo;Quero ir além de terminar. Gosto de completar tudo, 100%, platinar, bater tempos e explorar cada detalhe.&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 text-[11px] text-primary/90 font-medium">
                    &ldquo;Para quem transforma cada jogo em um desafio.&rdquo;
                  </div>
                </div>
              </div>

              {/* Style Dynamic Preview Box */}
              <div className="p-5 rounded-2xl bg-background border border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-popover-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Prévia Conceitual do Perfil ({formData.playerStyle.toUpperCase()})
                  </span>
                  <span className="text-[11px] text-muted-foreground">O estilo altera apenas a hierarquia visual, não bloqueia recursos.</span>
                </div>

                <div className="p-4 rounded-xl bg-secondary/80 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 rounded-lg bg-secondary border border-border overflow-hidden shrink-0">
                      <img
                        src="https://images.igdb.com/igdb/image/upload/t_cover_big/cob1t2.webp"
                        alt="Capa de Undertale"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Undertale</h4>
                      <p className="text-[11px] text-popover-foreground">Terminado em 12 de Outubro</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                      Nota: 9.5
                    </span>
                    {formData.playerStyle !== "casual" && (
                      <span className="px-2.5 py-1 rounded-md bg-secondary border border-border text-foreground/80 text-xs">
                        Review Registrada
                      </span>
                    )}
                    {formData.playerStyle === "tryhard" && (
                      <span className="px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center gap-1">
                        <Trophy className="w-3 h-3" /> 100% Platinado
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                  Sua jornada também evolui.
                </h1>
                <p className="text-sm sm:text-base text-popover-foreground font-light">
                  Você acaba de entrar. Agora sua jornada começa oficialmente no Level 1.
                </p>
              </div>

              {/* Level 1 Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary to-background border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-secondary-foreground flex flex-col items-center justify-center font-black shadow-lg shadow-primary/20">
                    <span className="text-[10px] uppercase tracking-wider">Level</span>
                    <span className="text-2xl">1</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">Início Oficial</span>
                    <h3 className="text-xl font-extrabold text-foreground">0 / 1.000 XP</h3>
                    <p className="text-xs text-popover-foreground">Quanto mais da sua história você registra, mais você evolui.</p>
                  </div>
                </div>
                <div className="w-full sm:w-48 bg-background rounded-full h-3 border border-border overflow-hidden p-0.5">
                  <div className="bg-primary h-full rounded-full w-[2%] shadow-[0_0_8px_hsl(var(--primary) / 0.8)]" />
                </div>
              </div>

              {/* XP Actions Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-popover-foreground uppercase tracking-wider">Como você ganha XP na plataforma</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <Gamepad2 className="w-4 h-4" /> Registrar um jogo
                    </div>
                    <p className="text-xs text-popover-foreground font-light">Ganhe XP ao adicionar novos títulos à sua jornada.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <Star className="w-4 h-4" /> Dar uma nota
                    </div>
                    <p className="text-xs text-popover-foreground font-light">Registre o que você achou de cada experiência concluída.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <Edit3 className="w-4 h-4" /> Escrever uma review
                    </div>
                    <p className="text-xs text-popover-foreground font-light">Compartilhe suas impressões detalhadas sobre o jogo.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Completar 100%
                    </div>
                    <p className="text-xs text-popover-foreground font-light">Mostre quando foi além da conclusão padrão do jogo.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-background border border-border/80 space-y-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <Trophy className="w-4 h-4" /> Conquistar platina
                    </div>
                    <p className="text-xs text-popover-foreground font-light">Registre marcos épicos e conquistas máximas.</p>
                  </div>
                </div>
              </div>

              {/* Insignias Concept */}
              <div className="p-5 rounded-2xl bg-background border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-secondary-foreground">Recompensas e Insígnias Futuras</h3>
                    <p className="text-xs text-popover-foreground font-light">Quanto mais você evolui, mais insígnias exclusivas desbloqueia no perfil.</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center py-6 animate-fadeIn max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-inner">
                <Shield className="w-8 h-8" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                  Tudo pronto.
                </h1>
                <p className="text-sm sm:text-base text-popover-foreground font-light">
                  Sua identidade está criada. Sua jornada começa agora.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-background border border-border text-left space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-border/80">
                  <div className="w-14 h-14 rounded-full bg-secondary border border-border overflow-hidden flex items-center justify-center font-bold text-popover-foreground">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      formData.displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{formData.displayName}</h3>
                    <p className="text-xs text-primary capitalize">Estilo: {formData.playerStyle} • {formData.country}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-popover-foreground">
                  <span>Status Inicial:</span>
                  <span className="text-foreground font-semibold">Level 1 (0 XP)</span>
                </div>
              </div>

            </div>
          )}
        </div>

        {}
        <div className="px-6 py-4 border-t border-border/60 flex items-center justify-between bg-secondary/50">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary border border-border text-xs font-medium text-foreground/80 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary text-foreground text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-lg shadow-border-primary/20 cursor-pointer ml-auto"
            >
              Continuar <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => alert("Parabéns! Sua jornada foi iniciada com sucesso.")}
              className="px-8 py-3 rounded-xl bg-primary hover:bg-primary text-foreground text-sm font-bold tracking-wide transition-all flex items-center gap-2 shadow-lg shadow-bg-primary/30 cursor-pointer mx-auto sm:mx-0"
            >
              Começar minha jornada <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  )
}