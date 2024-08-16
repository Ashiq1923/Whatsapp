
// <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>
var firebaseConfig = {
    apiKey: "AIzaSyBuUopTM0DwN6UMQfH25IGUOnpqgzXg2Jo",
    authDomain: "login-page-dbce3.firebaseapp.com",
    projectId: "login-page-dbce3",
    storageBucket: "login-page-dbce3.appspot.com",
    messagingSenderId: "744916859712",
    appId: "1:744916859712:web:247fc8f2ec1ef1f06b58a5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM elements
const signincontainer = document.getElementById('auth-container');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const profilePage = document.getElementById('profile-page');
const signinButton = document.getElementById('signin-button');
const signupButton = document.getElementById('signup-button');
const createAccountButton = document.getElementById('create-account-button');
const backToSigninButton = document.getElementById('back-to-signin-button');
const signoutButton = document.getElementById('signout-button');
const signinError = document.getElementById('signin-error');
const signupError = document.getElementById('signup-error');
const container = document.getElementsByClassName('container')[0];


// Switch to sign-up form
createAccountButton.addEventListener('click', () => {
    signinForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupError.textContent = '';
    signinError.textContent = '';
});

// Switch to sign-in form
backToSigninButton.addEventListener('click', () => {
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
});

// Sign up
signupButton.addEventListener('click', () => {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const dob = document.getElementById('signup-dob').value;
    const gender = document.getElementById('signup-gender').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // User created
            console.log('User Created:', userCredential.user);

            // Store additional user details in Firestore
            return db.collection('users').doc(userCredential.user.uid).set({
                email: email,
                dob: dob,
                gender: gender
            });
        })
        .then(() => {
            // Redirect to sign-in form
            signupForm.style.display = 'none';
            signinForm.style.display = 'block';
            signupError.textContent = 'Loading, wait....'; // Clear any previous error
        })
        .catch(error => {
            console.error('Sign Up Error:', error.message);
            signupError.textContent = `Error: please Create Your Account`;
        });
});

// Sign in
signinButton.addEventListener('click', () => {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed in
            console.log('Signed In:', userCredential.user);
            signinError.textContent = 'Loading, wait....'; // Clear any previous error

            // Fetch user details from Firestore
            return db.collection('users').doc(userCredential.user.uid).get();
        })
        .then(doc => {
            if (doc.exists) {
                // Show dashboard
                signincontainer.style.display = 'none';
                signinForm.style.display = 'none';
                container.style.display = 'block';
            }
        })
        .catch(error => {
            signinError.textContent = `Error: ${error.message}`;
        });
});

// Sign out
signoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        // Sign-out successful.
        document.getElementById('signin-email').value = '';
        document.getElementById('signin-password').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
        document.getElementById('signup-dob').value = '';
        document.getElementById('signup-gender').value = '';
        signinError.textContent = '';
        signupError.textContent = '';
        console.log('Signed Out');
        signincontainer.style.display = 'block';
        signinForm.style.display = 'block';
        container.style.display = 'none';

    }).catch((error) => {
        // An error happened.
        console.error('Sign Out Error:', error.message);
    });
});

// Dashboard
const items = [
    { id: 1, name: 'Asparagus', description: 'Green vegetable with long spears. Rich in vitamins.', image: 'https://via.placeholder.com/150?text=Asparagus' },
    { id: 2, name: 'Beetroot', description: 'Root vegetable with deep red color. Great for salads.', image: 'https://via.placeholder.com/150?text=Beetroot' },
    { id: 3, name: 'Carrot', description: 'Orange root vegetable. High in beta-carotene.', image: 'https://via.placeholder.com/150?text=Carrot' },
    { id: 4, name: 'Daikon', description: 'Japanese radish with a mild flavor. Often used in salads.', image: 'https://via.placeholder.com/150?text=Daikon' },
    { id: 5, name: 'Eggplant', description: 'Purple vegetable with a spongy texture. Good for grilling.', image: 'https://via.placeholder.com/150?text=Eggplant' },
    { id: 6, name: 'Fennel', description: 'Anise-flavored vegetable with a crunchy texture. Used in salads and cooking.', image: 'https://via.placeholder.com/150?text=Fennel' },
    { id: 7, name: 'Garlic', description: 'Strong-flavored bulb used as a seasoning. Known for its health benefits.', image: 'https://via.placeholder.com/150?text=Garlic' },
    { id: 8, name: 'Horseradish', description: 'Spicy root vegetable. Used as a condiment or in sauces.', image: 'https://via.placeholder.com/150?text=Horseradish' },
    { id: 9, name: 'Iceberg Lettuce', description: 'Crisp, mild-flavored lettuce. Often used in salads.', image: 'https://via.placeholder.com/150?text=Iceberg+Lettuce' },
    { id: 10, name: 'Jalapeño', description: 'Spicy green chili pepper. Used in many dishes for heat.', image: 'https://via.placeholder.com/150?text=Jalapeño' },
    { id: 11, name: 'Kale', description: 'Dark green leafy vegetable. Rich in vitamins and minerals.', image: 'https://via.placeholder.com/150?text=Kale' },
    { id: 12, name: 'Leek', description: 'Mild-flavored vegetable with a long, white stalk. Used in soups and stews.', image: 'https://via.placeholder.com/150?text=Leek' },
    { id: 13, name: 'Mushroom', description: 'Fungi with a meaty texture. Used in many dishes for flavor.', image: 'https://via.placeholder.com/150?text=Mushroom' },
    { id: 14, name: 'Napa Cabbage', description: 'Chinese cabbage with a mild flavor. Used in stir-fries and soups.', image: 'https://via.placeholder.com/150?text=Napa+Cabbage' },
    { id: 15, name: 'Okra', description: 'Green vegetable with a unique texture. Often used in Southern cooking.', image: 'https://via.placeholder.com/150?text=Okra' },
    { id: 16, name: 'Pepper', description: 'Bell pepper or chili pepper. Used in various dishes for flavor and color.', image: 'https://via.placeholder.com/150?text=Pepper' },
    { id: 17, name: 'Quinoa', description: 'Although not a vegetable, it is often included in vegetable dishes. Protein-rich grain.', image: 'https://via.placeholder.com/150?text=Quinoa' },
    { id: 18, name: 'Radish', description: 'Crunchy root vegetable with a peppery flavor. Used in salads.', image: 'https://via.placeholder.com/150?text=Radish' },
    { id: 19, name: 'Spinach', description: 'Leafy green vegetable high in iron and vitamins. Used in salads and cooking.', image: 'https://via.placeholder.com/150?text=Spinach' },
    { id: 20, name: 'Tomato', description: 'Red fruit often used as a vegetable. Rich in vitamins and antioxidants.', image: 'https://via.placeholder.com/150?text=Tomato' },
    { id: 21, name: 'Ugli Fruit', description: 'A hybrid citrus fruit. Tangy and sweet flavor.', image: 'https://via.placeholder.com/150?text=Ugli+Fruit' },
    { id: 22, name: 'Valerian', description: 'Herb often used for its calming effects. Used in teas and supplements.', image: 'https://via.placeholder.com/150?text=Valerian' },
    { id: 23, name: 'Watercress', description: 'Peppery leaf vegetable often used in salads.', image: 'https://via.placeholder.com/150?text=Watercress' },
    { id: 24, name: 'Xigua', description: 'Chinese watermelon. Refreshing and sweet.', image: 'https://via.placeholder.com/150?text=Xigua' },
    { id: 25, name: 'Yam', description: 'Starchy tuber. Often confused with sweet potatoes.', image: 'https://via.placeholder.com/150?text=Yam' },
    { id: 26, name: 'Zucchini', description: 'Summer squash with a mild flavor. Used in various dishes.', image: 'https://via.placeholder.com/150?text=Zucchini' }
    // Add more items as needed
];

function displayItems(itemsToDisplay) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    itemsToDisplay.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
        `;
        itemList.appendChild(itemDiv);
    });
}

function searchItems(query) {
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    displayItems(filteredItems);
}

document.getElementById('searchBar').addEventListener('input', (event) => {
    searchItems(event.target.value);
});

// Initial display
displayItems(items);
