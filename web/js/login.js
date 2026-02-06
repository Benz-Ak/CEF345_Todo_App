const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim(); // Nettoie les espaces
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // On stocke les infos pour identifier l'utilisateur sur la page Todo
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('userEmail', data.user.email);

                // Redirection vers la route serveur /todo
                window.location.href = '/todo';
            } else {
                alert("Échec de connexion: " + data.error);
            }
        } catch (error) {
            console.error("Erreur de connexion:", error);
            alert("Le serveur ne répond pas. Vérifiez qu'il est bien lancé.");
        }
    });
}