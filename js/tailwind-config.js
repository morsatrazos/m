/**
 * Configuración de Tailwind CSS para Moofin
 */
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            },
            colors: {
                brand: {
                    dark: '#0B1120',
                    navy: '#1E293B',
                    teal: '#00C9A7',
                    tealDark: '#009B82',
                    tealLight: '#E6FFFA',
                    blue: '#38BDF8',
                    blueDark: '#0284C7',
                    gold: '#F59E0B',
                    red: '#EF4444',
                    green: '#10B981'
                }
            },
            boxShadow: {
                'teal-glow': '0 0 25px -5px rgba(0, 201, 167, 0.3)',
                'blue-glow': '0 0 25px -5px rgba(56, 189, 248, 0.3)',
                'gold-glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)'
            }
        }
    }
};
