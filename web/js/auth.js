// Gestion de l'inscription
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const full_name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ full_name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Compte créé avec succès ! Connectez-vous.");
                window.location.href = '/'; // Redirige vers la page de login
            } else {
                alert("Erreur: " + data.error);
            }
        } catch (error) {
            console.error("Erreur d'inscription:", error);
        }
    });
}