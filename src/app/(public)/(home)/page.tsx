import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Layers, Zap, Compass, Users, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-20 py-8">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold w-fit">
                        <Sparkles className="w-3.5 h-3.5" />
                        Sua jornada gamer merece ser registrada
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
                        TRANSFORME SEUS JOGOS <br />
                        <span className="text-primary">EM UMA JORNADA.</span>
                    </h1>

                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
                        Registre os jogos que você já finalizou, conquiste XP e acompanhe sua
                        evolução a cada nova aventura. Sua história já começou.
                    </p>

                    <div className="relative flex justify-center w-full lg:hidden my-4">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-blue-600 opacity-20 blur-xl"></div>
                        <div className="relative w-full max-w-md bg-card dark:bg-black border border-border rounded-2xl p-6 shadow-xl flex flex-col gap-6">
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-primary text-lg">
                                        PL
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-foreground">
                                            CAÇADOR NOSTÁLGICO
                                        </h3>
                                        <span className="text-xs text-muted-foreground">
                                            Veterano dos 16-bits
                                        </span>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                    LV. 18
                                </span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                    <span>Progresso da Jornada</span>
                                    <span className="text-primary font-bold">4.850 XP</span>
                                </div>
                                <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[70%] rounded-full"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-muted/50 dark:bg-zinc-900 border border-border/50 rounded-xl p-3 text-center">
                                    <span className="block text-2xl font-black text-foreground">
                                        42
                                    </span>
                                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                                        Games Finalizados
                                    </span>
                                </div>
                                <div className="bg-muted/50 dark:bg-zinc-900 border border-border/50 rounded-xl p-3 text-center">
                                    <span className="block text-2xl font-black text-foreground">
                                        12
                                    </span>
                                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                                        Clássicos Conquistados
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 w-full">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-lg shadow-primary/20"
                        >
                            🎮 Começar minha jornada
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-border gap-2 hover:bg-accent hover:text-foreground"
                        >
                            📖 Conhecer a plataforma
                        </Button>
                    </div>
                </div>

                <div className="relative hidden lg:flex justify-center w-full">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-blue-600 opacity-20 blur-xl"></div>
                    <div className="relative w-full max-w-md bg-card dark:bg-black border border-border rounded-2xl p-6 shadow-xl flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center font-bold text-primary text-lg">
                                    DC
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-foreground">
                                        CAÇADOR NOSTÁLGICO
                                    </h3>
                                    <span className="text-xs text-muted-foreground">
                                        Veterano dos 16-bits
                                    </span>
                                </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                LV. 18
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                <span>Progresso da Jornada</span>
                                <span className="text-primary font-bold">4.850 XP</span>
                            </div>
                            <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[70%] rounded-full"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="bg-muted/50 dark:bg-zinc-900 border border-border/50 rounded-xl p-3 text-center">
                                <span className="block text-2xl font-black text-foreground">
                                    42
                                </span>
                                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                                    Games Finalizados
                                </span>
                            </div>
                            <div className="bg-muted/50 dark:bg-zinc-900 border border-border/50 rounded-xl p-3 text-center">
                                <span className="block text-2xl font-black text-foreground">
                                    12
                                </span>
                                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                                    Clássicos Conquistados
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-border/60 pt-20">
                <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        Tradição Gamer
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        VOCÊ NÃO ESTÁ COMEÇANDO DO ZERO.
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Já terminou dezenas, centenas de jogos ou até perdeu a conta? Traga sua
                        história para a plataforma e organize seu legado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-card dark:bg-black/40 backdrop-blur-md border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Sua coleção</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Reúna os jogos que fizeram parte da sua história, desde os clássicos
                            retrôs até os lançamentos atuais.
                        </p>
                    </div>

                    <div className="bg-card dark:bg-black/40 backdrop-blur-md border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Sua evolução</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Ganhe experiência a cada finalização e acompanhe o crescimento do seu
                            perfil de jogador nível a nível.
                        </p>
                    </div>

                    <div className="bg-card dark:bg-black/40 backdrop-blur-md border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Sua jornada</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Continue registrando cada nova aventura e construa um mapa vivo de todas
                            as suas experiências virtuais.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-card/50 dark:bg-black/30 backdrop-blur-md border border-border/60 rounded-3xl p-8 sm:p-12">
                <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        CADA JOGO CONCLUÍDO É UM PASSO NA SUA JORNADA.
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Sua coleção não precisa ser apenas uma lista fria de jogos. Acompanhe seu
                        progresso, conquiste experiência e construa seu perfil enquanto continua
                        jogando.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-card dark:bg-black/40 border border-border p-4 rounded-xl flex flex-col gap-2">
                        <span className="text-xs font-bold text-primary">MARCO 01</span>
                        <span className="font-semibold text-sm text-foreground">
                            Primeiro jogo registrado
                        </span>
                    </div>
                    <div className="bg-card dark:bg-black/40 border border-border p-4 rounded-xl flex flex-col gap-2">
                        <span className="text-xs font-bold text-primary">MARCO 05</span>
                        <span className="font-semibold text-sm text-foreground">
                            10 jogos finalizados
                        </span>
                    </div>
                    <div className="bg-card dark:bg-black/40 border border-border p-4 rounded-xl flex flex-col gap-2">
                        <span className="text-xs font-bold text-primary">MARCO 10</span>
                        <span className="font-semibold text-sm text-foreground">
                            Primeira review publicada
                        </span>
                    </div>
                    <div className="bg-card dark:bg-black/40 border border-border p-4 rounded-xl flex flex-col gap-2">
                        <span className="text-xs font-bold text-primary">MARCO 20</span>
                        <span className="font-semibold text-sm text-foreground">
                            Conquista especial rara
                        </span>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        Exploração & Tesouros
                    </span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                        ALGUMAS DAS MELHORES AVENTURAS AINDA ESTÃO ESPERANDO POR VOCÊ.
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Descubra jogos de diferentes gerações, explore experiências fora dos grandes
                        lançamentos e compartilhe suas descobertas com outros jogadores que amam a
                        história dos games.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <span>Clássicos, indies e cults de todas as eras</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card dark:bg-black/40 backdrop-blur-md border border-border p-6 rounded-2xl flex flex-col justify-between h-40 shadow-sm">
                        <Compass className="w-8 h-8 text-primary" />
                        <div>
                            <span className="block font-bold text-sm text-foreground">
                                Gerações Clássicas
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Do 8-bit à era de ouro
                            </span>
                        </div>
                    </div>
                    <div className="bg-card dark:bg-black/40 backdrop-blur-md border border-border p-6 rounded-2xl flex flex-col justify-between h-40 shadow-sm mt-6">
                        <Users className="w-8 h-8 text-primary" />
                        <div>
                            <span className="block font-bold text-sm text-foreground">
                                Comunidade Nostálgica
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Troque ideias e reviews
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-card dark:bg-black/50 backdrop-blur-md border border-primary/20 rounded-3xl p-8 sm:p-16 text-center flex flex-col items-center gap-6 shadow-lg">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-xl text-foreground">
                    PRONTO PARA REGISTRAR SUA PRÓXIMA AVENTURA?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                    Crie seu perfil, registre seus primeiros jogos e comece a construir sua jornada
                    hoje mesmo.
                </p>
                <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 gap-2 shadow-xl shadow-primary/20"
                >
                    Começar gratuitamente <ArrowRight className="w-4 h-4" />
                </Button>
                <span className="text-xs text-muted-foreground">
                    Sem complicação. Sua história já começou.
                </span>
            </section>
        </div>
    );
}
