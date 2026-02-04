document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('site-nav');
    if (!container) return;

    const normalizedPath = window.location.pathname.replace(/\\/g, '/');
    const isCondicoes = normalizedPath.includes('/condicoes/');
    const prefix = isCondicoes ? '../' : '';

    container.innerHTML = `
        <nav class="fixed w-full z-50 bg-eqlive-base/98 backdrop-blur-lg border-b border-eqlive-dark/8 shadow-sm transition-all duration-300">
            <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <div class="flex-shrink-0 flex items-center cursor-pointer group" onclick="navigateTo('home')">
                        <img src="${prefix}src/assets/images/banner_logo.png" alt="Eqlive" class="h-11 group-hover:scale-105 transition-transform duration-300">
                    </div>
                    
                    <div class="hidden lg:flex items-center gap-1">
                        <div class="flex items-center gap-8">
                            <div class="relative group nav-dropdown">
                                <button class="nav-link-desktop text-sm font-500 text-eqlive-dark transition-all duration-300 relative group flex items-center gap-1.5" aria-haspopup="true" aria-expanded="false">
                                    Condições
                                    <i data-lucide="chevron-down" class="w-4 h-4 group-hover:translate-y-0.5 transition-transform"></i>
                                    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-green group-hover:w-full transition-all duration-300"></span>
                                </button>
                                <div class="nav-dropdown-menu">
                                    <div class="nav-dropdown-panel">
                                        <div class="grid grid-cols-2 gap-2">
                                            <a href="${prefix}condicoes/saude-intestinal.html" class="nav-dropdown-link">Saúde intestinal e digestiva</a>
                                            <a href="${prefix}condicoes/doencas-autoimunes.html" class="nav-dropdown-link">Doenças autoimunes e inflamação</a>
                                            <a href="${prefix}condicoes/saude-metabolica.html" class="nav-dropdown-link">Saúde metabólica</a>
                                            <a href="${prefix}condicoes/resistencia-a-insulina.html" class="nav-dropdown-link">Resistência à insulina</a>
                                            <a href="${prefix}condicoes/pre-diabetes.html" class="nav-dropdown-link">Pré-diabetes</a>
                                            <a href="${prefix}condicoes/sop.html" class="nav-dropdown-link">SOP</a>
                                            <a href="${prefix}condicoes/desequilibrio-hormonal.html" class="nav-dropdown-link">Saúde hormonal</a>
                                            <a href="${prefix}condicoes/menopausa.html" class="nav-dropdown-link">Perimenopausa e Menopausa</a>
                                            <a href="${prefix}condicoes/hipotireoidismo.html" class="nav-dropdown-link">Hipotireoidismo</a>
                                            <a href="${prefix}condicoes/tireoidite-de-hashimoto.html" class="nav-dropdown-link">Tireoidite de Hashimoto</a>
                                            <a href="${prefix}condicoes/sintomas-inexplicaveis.html" class="nav-dropdown-link">Sintomas inexplicáveis</a>
                                            <a href="${prefix}condicoes/desintoxicacao-e-exposicao-ambiental.html" class="nav-dropdown-link">Desintoxicação e exposição ambiental</a>
                                            <a href="${prefix}condicoes/longevidade-e-saude.html" class="nav-dropdown-link">Longevidade e vida saudável</a>
                                            <a href="${prefix}condicoes/saude-mental.html" class="nav-dropdown-link">Saúde mental</a>
                                            <a href="${prefix}condicoes/ansiedade-e-burnout.html" class="nav-dropdown-link">Ansiedade e burnout</a>
                                            <a href="${prefix}condicoes/depressao.html" class="nav-dropdown-link">Depressão</a>
                                        </div>
                                        <div class="mt-4 pt-4 border-t border-eqlive-dark/10 flex flex-wrap items-center justify-between gap-3">
                                            <a href="${prefix}condicoes/index.html" class="nav-dropdown-link">Ver todas as condições</a>
                                            <a href="${prefix}care.html" class="cta-outline text-sm">Questionário de saúde</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onclick="navigateTo('about')" class="nav-link-desktop text-sm font-500 text-eqlive-dark transition-all duration-300 relative group">
                                Quem Somos
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-green group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <button onclick="navigateTo('specialties')" class="nav-link-desktop text-sm font-500 text-eqlive-dark transition-all duration-300 relative group">
                                Tratamentos
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-green group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <button onclick="navigateTo('essence')" class="nav-link-desktop text-sm font-500 text-eqlive-accent hover:text-[#b88655] transition-colors duration-300 font-serif italic relative group">
                                Essence
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-accent group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <a href="${prefix}care.html" class="nav-link-desktop text-sm font-500 text-eqlive-dark transition-all duration-300 relative group flex items-center gap-1.5">
                                <i data-lucide="activity" class="w-4 h-4 group-hover:scale-110 transition-transform"></i> Questionário
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-green group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <button onclick="navigateTo('blog')" class="nav-link-desktop text-sm font-500 text-eqlive-dark transition-all duration-300 relative group">
                                Blog
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-green group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <button onclick="navigateTo('faq')" class="nav-link-desktop text-sm font-500 text-eqlive-dark transition-all duration-300 relative group">
                                FAQ
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-green group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <button onclick="navigateTo('location')" class="nav-link-desktop text-sm font-500 text-eqlive-dark transition-all duration-300 relative group flex items-center gap-1.5">
                                <i data-lucide="map-pin" class="w-4 h-4 group-hover:scale-110 transition-transform"></i>
                                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-eqlive-green group-hover:w-full transition-all duration-300"></span>
                            </button>
                        </div>
                        
                        <div class="h-6 w-px bg-eqlive-dark/10 mx-4"></div>
                        
                        <a href="https://wa.me/5521967815767" target="_blank" class="bg-gradient-to-r from-eqlive-dark to-eqlive-green text-white px-6 py-2.5 rounded-full text-sm font-600 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
                            <i data-lucide="message-circle" class="w-4 h-4"></i>
                            Comece Agora
                        </a>
                    </div>

                    <div class="lg:hidden flex items-center gap-3">
                        <button onclick="navigateTo('location')" class="text-eqlive-dark hover:text-eqlive-green transition p-2">
                            <i data-lucide="map-pin" class="w-5 h-5"></i>
                        </button>
                        <button id="mobile-menu-btn" class="text-eqlive-dark hover:text-eqlive-green focus:outline-none p-2" aria-expanded="false" aria-controls="mobile-menu">
                            <i data-lucide="menu" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="mobile-menu-overlay" class="hidden lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30 opacity-0 transition-opacity duration-500 ease-out"></div>

            <div id="mobile-menu" class="hidden lg:hidden bg-gradient-to-b from-eqlive-dark via-eqlive-dark/95 to-eqlive-green/95 fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-sm pt-16 pb-8 overflow-y-auto overscroll-contain z-40 transform transition-transform duration-600 ease-out translate-x-full shadow-2xl rounded-l-3xl border-l border-white/10 will-change-transform">
                <div class="px-5 flex flex-col gap-4 min-h-[calc(100dvh-17rem)] text-white">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="h-11 w-11 rounded-2xl bg-white border border-white/40 flex items-center justify-center">
                                <img src="${prefix}src/assets/images/banner_logo.png" alt="Eqlive" class="h-6">
                            </div>
                            <div>
                                <p class="text-xs uppercase tracking-widest text-white/60">Clínica Eqlive</p>
                                <h3 class="font-serif text-2xl">Menu</h3>
                            </div>
                        </div>
                        <button id="mobile-menu-close" aria-label="Fechar menu" class="h-10 w-10 rounded-full border border-white/15 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>

                    <div class="bg-white/10 rounded-2xl p-2 border border-white/10 flex flex-col gap-1">
                        <p class="text-[11px] uppercase tracking-[0.2em] text-white/50 px-3 pt-2">Navegação</p>
                        <button onclick="mobileNav('about')" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">
                            <i data-lucide="info" class="w-5 h-5 text-eqlive-peach"></i>
                            Quem Somos
                        </button>
                        <button onclick="mobileNav('specialties')" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">
                            <i data-lucide="stethoscope" class="w-5 h-5 text-eqlive-peach"></i>
                            Tratamentos
                        </button>
                        <button onclick="mobileNav('essence')" class="mobile-nav-item text-[15px] font-medium text-eqlive-peach flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition font-serif italic">
                            <i data-lucide="sparkles" class="w-5 h-5 text-eqlive-peach"></i>
                            Essence
                        </button>
                        <a href="${prefix}care.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">
                            <i data-lucide="activity" class="w-5 h-5 text-eqlive-peach"></i>
                            Questionário
                        </a>
                        <button onclick="mobileNav('blog')" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">
                            <i data-lucide="book-open" class="w-5 h-5 text-eqlive-peach"></i>
                            Blog
                        </button>
                        <button onclick="mobileNav('faq')" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">
                            <i data-lucide="help-circle" class="w-5 h-5 text-eqlive-peach"></i>
                            FAQ
                        </button>
                        <button onclick="mobileNav('location')" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">
                            <i data-lucide="map-pin" class="w-5 h-5 text-eqlive-peach"></i>
                            Localização
                        </button>
                    </div>

                    <div class="bg-white/10 rounded-2xl p-4 border border-white/10 flex flex-col gap-3">
                        <p class="text-[11px] uppercase tracking-[0.2em] text-white/50">Condições</p>
                        <div class="grid grid-cols-1 gap-2 text-sm">
                            <a href="${prefix}condicoes/saude-intestinal.html" class="text-white/80 hover:text-white transition">Saúde intestinal e digestiva</a>
                            <a href="${prefix}condicoes/saude-metabolica.html" class="text-white/80 hover:text-white transition">Saúde metabólica</a>
                            <a href="${prefix}condicoes/ansiedade-e-burnout.html" class="text-white/80 hover:text-white transition">Ansiedade e burnout</a>
                            <a href="${prefix}condicoes/menopausa.html" class="text-white/80 hover:text-white transition">Perimenopausa e Menopausa</a>
                        </div>
                        <a href="${prefix}condicoes/index.html" class="text-sm text-eqlive-peach hover:text-white transition">Ver todas as condições</a>
                    </div>
                </div>
                <div class="px-5 mt-6">
                    <a href="https://wa.me/5521967815767" target="_blank" class="w-full flex items-center justify-center gap-2 bg-white text-eqlive-dark font-semibold py-3 rounded-2xl hover:shadow-lg transition">
                        <i data-lucide="message-circle" class="w-5 h-5"></i>
                        Comece Agora
                    </a>
                </div>
            </div>
        </nav>
    `;
});
