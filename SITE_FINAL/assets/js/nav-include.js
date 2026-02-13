document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('site-nav');
    if (!container) return;

    const normalizedPath = window.location.pathname.replace(/\\/g, '/');
    const isPages = normalizedPath.includes('/pages/');
    const isCondicoes = normalizedPath.includes('/condicoes/');
    let prefix = '';
    if (isPages) {
        prefix = '../../';
    } else if (isCondicoes) {
        prefix = '../';
    }

    container.innerHTML = `
        <nav class="fixed w-full z-50 bg-eqlive-base/98 backdrop-blur-lg border-b border-eqlive-dark/8 shadow-sm transition-all duration-300">
            <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <!-- Logo -->
                    <div class="flex-shrink-0 flex items-center cursor-pointer group" onclick="navigateTo('home')">
                        <img src="${prefix}assets/images/banner_logo.png" alt="Eqlive" class="h-11 group-hover:scale-105 transition-transform duration-300">
                    </div>
                    
                    <!-- Desktop Menu -->
                    <div class="hidden lg:flex items-center gap-1">
                        <!-- Main Navigation -->
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
                        
                        <!-- Divider -->
                        <div class="h-6 w-px bg-eqlive-dark/10 mx-4"></div>
                        
                        <!-- CTA Button -->
                        <a href="https://wa.me/5521967815767" target="_blank" class="bg-gradient-to-r from-eqlive-dark to-eqlive-green text-white px-6 py-2.5 rounded-full text-sm font-600 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
                            <i data-lucide="message-circle" class="w-4 h-4"></i>
                            Comece Agora
                        </a>
                    </div>

                    <!-- Mobile menu button -->
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
            
            <!-- Mobile Menu Overlay -->
            <div id="mobile-menu-overlay" class="hidden lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30 opacity-0 transition-opacity duration-500 ease-out"></div>

            <!-- Mobile Menu Panel -->
            <div id="mobile-menu" class="hidden lg:hidden bg-gradient-to-b from-eqlive-dark via-eqlive-dark/95 to-eqlive-green/95 fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-sm pt-16 pb-8 overflow-y-auto overscroll-contain z-40 transform transition-transform duration-600 ease-out translate-x-full shadow-2xl rounded-l-3xl border-l border-white/10 will-change-transform">
                <div class="px-5 flex flex-col gap-4 min-h-[calc(100dvh-17rem)] text-white">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="h-11 w-11 rounded-2xl bg-white border border-white/40 flex items-center justify-center">
                                <img src="${prefix}assets/images/banner_logo.png" alt="Eqlive" class="h-6">
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
                            Questionário de Saúde
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

                    <div class="bg-white/10 rounded-2xl p-2 border border-white/10 flex flex-col gap-1">
                        <p class="text-[11px] uppercase tracking-[0.2em] text-white/50 px-3 pt-2">Condições</p>
                        <a href="${prefix}condicoes/saude-intestinal.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Saúde intestinal e digestiva</a>
                        <a href="${prefix}condicoes/doencas-autoimunes.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Doenças autoimunes e inflamação</a>
                        <a href="${prefix}condicoes/saude-metabolica.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Saúde metabólica</a>
                        <a href="${prefix}condicoes/resistencia-a-insulina.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Resistência à insulina</a>
                        <a href="${prefix}condicoes/pre-diabetes.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Pré-diabetes</a>
                        <a href="${prefix}condicoes/sop.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">SOP</a>
                        <a href="${prefix}condicoes/desequilibrio-hormonal.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Saúde hormonal</a>
                        <a href="${prefix}condicoes/menopausa.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Perimenopausa e Menopausa</a>
                        <a href="${prefix}condicoes/hipotireoidismo.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Hipotireoidismo</a>
                        <a href="${prefix}condicoes/tireoidite-de-hashimoto.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Tireoidite de Hashimoto</a>
                        <a href="${prefix}condicoes/sintomas-inexplicaveis.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Sintomas inexplicáveis</a>
                        <a href="${prefix}condicoes/desintoxicacao-e-exposicao-ambiental.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Desintoxicação e exposição ambiental</a>
                        <a href="${prefix}condicoes/longevidade-e-saude.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Longevidade e vida saudável</a>
                        <a href="${prefix}condicoes/saude-mental.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Saúde mental</a>
                        <a href="${prefix}condicoes/ansiedade-e-burnout.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Ansiedade e burnout</a>
                        <a href="${prefix}condicoes/depressao.html" class="mobile-nav-item text-[15px] font-medium text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Depressão</a>
                        <a href="${prefix}condicoes/index.html" class="mobile-nav-item text-[15px] font-semibold text-white flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 transition">Ver todas as condições</a>
                    </div>
                    
                    <!-- CTA Button Mobile -->
                    <div class="mt-10 bg-white/10 rounded-2xl p-3 border border-white/10">
                        <p class="text-xs text-white/70 mb-3">Atendimento rápido e personalizado.</p>
                        <a href="https://wa.me/5521967815767" class="block w-full bg-eqlive-peach text-eqlive-dark text-center py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            <i data-lucide="message-circle" class="w-5 h-5"></i>
                            Falar com Consultor
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    `;

    const initIcons = () => {
        // Aguarda um pouco para garantir que os elementos estão no DOM
        setTimeout(() => {
            try { 
                if (window.lucide && lucide.replace) {
                    lucide.replace(); 
                }
            } catch (e) {}
            try { 
                if (window.lucide && lucide.createIcons) {
                    lucide.createIcons(); 
                }
            } catch (e) {}
        }, 50);
    };

    const initFloatingActions = () => {
        const backToTop = document.getElementById('back-to-top');
        const floatingActions = document.getElementById('floating-actions');
        if (!backToTop || !floatingActions) return;

        let ticking = false;

        const updateFloatingActions = () => {
            const isScrolled = window.scrollY > 220;
            floatingActions.classList.toggle('is-scrolled', isScrolled);
            floatingActions.classList.toggle('at-top', !isScrolled);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateFloatingActions);
                ticking = true;
            }
        };

        updateFloatingActions();
        window.addEventListener('scroll', onScroll, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    const shouldInjectCondicaoExtras = document.body?.dataset?.template === 'condicao';
    if (shouldInjectCondicaoExtras && !document.getElementById('site-footer')) {
        document.body.insertAdjacentHTML('beforeend', `
            <footer id="site-footer" class="bg-eqlive-dark text-white pt-20 pb-10 border-t border-white/10">
                <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                        <!-- Brand -->
                        <div class="col-span-1 lg:col-span-1">
                            <img src="${prefix}assets/images/banner_logo.png" alt="Eqlive Logo" class="h-16 mb-6 rounded">
                            <p class="text-gray-300 text-sm leading-relaxed mb-6">
                                Medicina integrativa focada em longevidade e bem-estar.
                            </p>
                            <div class="flex gap-4">
                                <a href="https://www.instagram.com/clinica_eqlive/" target="_blank" class="text-gray-400 hover:text-eqlive-peach transition duration-300" aria-label="Instagram"><i data-lucide="instagram" class="w-5 h-5"></i></a>
                                <a href="https://www.facebook.com/profile.php?id=61573857150257" target="_blank" class="text-gray-400 hover:text-eqlive-peach transition duration-300" aria-label="Facebook"><i data-lucide="facebook" class="w-5 h-5"></i></a>
                            </div>
                        </div>

                        <!-- Navegação -->
                        <div>
                            <h4 class="font-semibold mb-6 text-white text-sm uppercase tracking-wider">Navegação</h4>
                            <ul class="space-y-3 text-sm text-gray-400">
                                <li><button onclick="navigateTo('home')" class="hover:text-eqlive-peach transition duration-300">Início</button></li>
                                <li><button onclick="navigateTo('specialties')" class="hover:text-eqlive-peach transition duration-300">Tratamentos</button></li>
                                <li><button onclick="navigateTo('about')" class="hover:text-eqlive-peach transition duration-300">Sobre Nós</button></li>
                                <li><a href="${prefix}care.html" class="hover:text-eqlive-peach transition duration-300">Questionário</a></li>
                            </ul>
                        </div>

                        <!-- Condições -->
                        <div>
                            <h4 class="font-semibold mb-6 text-white text-sm uppercase tracking-wider">Condições</h4>
                            <ul class="space-y-2 text-sm text-gray-400">
                                <li><a href="${prefix}condicoes/saude-intestinal.html" class="hover:text-eqlive-peach transition duration-300 line-clamp-1">Saúde Intestinal</a></li>
                                <li><a href="${prefix}condicoes/saude-metabolica.html" class="hover:text-eqlive-peach transition duration-300 line-clamp-1">Saúde Metabólica</a></li>
                                <li><a href="${prefix}condicoes/menopausa.html" class="hover:text-eqlive-peach transition duration-300 line-clamp-1">Menopausa</a></li>
                                <li><a href="${prefix}condicoes/index.html" class="hover:text-eqlive-peach transition duration-300 font-medium text-eqlive-peach">Ver todas →</a></li>
                            </ul>
                        </div>

                        <!-- Recursos -->
                        <div>
                            <h4 class="font-semibold mb-6 text-white text-sm uppercase tracking-wider">Recursos</h4>
                            <ul class="space-y-3 text-sm text-gray-400">
                                <li><button onclick="navigateTo('blog')" class="hover:text-eqlive-peach transition duration-300">Blog</button></li>
                                <li><button onclick="navigateTo('faq')" class="hover:text-eqlive-peach transition duration-300">FAQ</button></li>
                                <li><button onclick="navigateTo('essence')" class="hover:text-eqlive-peach transition duration-300 font-serif italic">Essence</button></li>
                            </ul>
                        </div>

                        <!-- Contato -->
                        <div>
                            <h4 class="font-semibold mb-6 text-white text-sm uppercase tracking-wider">Contato</h4>
                            <ul class="space-y-3 text-sm text-gray-400">
                                <li class="flex items-start gap-2">
                                    <i data-lucide="phone" class="w-4 h-4 mt-0.5 flex-shrink-0 text-eqlive-peach"></i>
                                    <a href="https://wa.me/5521967815767" class="hover:text-eqlive-peach transition duration-300">(21) 96781-5767</a>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i data-lucide="mail" class="w-4 h-4 mt-0.5 flex-shrink-0 text-eqlive-peach"></i>
                                    <a href="mailto:clinicaeqlive@gmail.com" class="hover:text-eqlive-peach transition duration-300">clinicaeqlive@gmail.com</a>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i data-lucide="map-pin" class="w-4 h-4 mt-0.5 flex-shrink-0 text-eqlive-peach"></i>
                                    <span class="text-xs">R. Pres. Costa e Silva, 117<br>Centro, Itaboraí - RJ</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bottom Bar -->
                    <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
                        <p class="text-gray-500">© 2026 EQLIVE Clínica Integrativa. Todos os direitos reservados.</p>
                        <p class="text-gray-500">Desenvolvido por <span class="text-eqlive-peach font-medium">Christyan Bernardo</span></p>
                    </div>
                </div>
            </footer>

            <div id="floating-actions" class="fixed bottom-10 right-6 z-50 flex flex-col items-center gap-3 at-top">
                <a href="https://wa.me/5521967815767" target="_blank" aria-label="Falar no WhatsApp" class="group relative flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-2xl hover:shadow-[0_20px_40px_rgba(37,211,102,0.35)] transition border border-[#25D366]/20 floating-whatsapp">
                    <img src="${prefix}assets/icons/whatsapp.png" alt="WhatsApp" class="w-10 h-10">
                    <span class="absolute right-16 bg-eqlive-dark text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition pointer-events-none whitespace-nowrap">Fale no WhatsApp</span>
                </a>
                <button id="back-to-top" type="button" aria-label="Voltar ao topo" class="h-12 w-12 rounded-full bg-eqlive-dark text-white shadow-xl hover:bg-eqlive-green transition flex items-center justify-center">
                    <i data-lucide="arrow-up" class="w-5 h-5"></i>
                </button>
            </div>
        `);
    }

    initIcons();
    
    // Reinicializar lucide novamente após um delay para garantir renderização
    setTimeout(() => {
        try { 
            if (window.lucide && lucide.replace) {
                lucide.replace(); 
            }
        } catch (e) {}
        try { 
            if (window.lucide && lucide.createIcons) {
                lucide.createIcons(); 
            }
        } catch (e) {}
    }, 100);
    
    initFloatingActions();
});
