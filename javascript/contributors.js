async function fetchContributors(owner,repo){
    try{
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        const data = await response.json();
        return data;
        if(!response.ok){
            throw new Error('Request Failed!');
        }
        const contributors= await response.json();
        return contributors;
    }catch(error){
        console.log(error.message);
    }
    return[];
}

async function displayContributors(contributors) {
    const contributorsList = document.getElementById('contributors-list');

    for (const contributor of contributors) {
        const li = document.createElement('li');
        li.className = "contributor-item";

        // Define color in JavaScript
        const hoverColor = 'rgb(152, 93, 16)';
        const brightnessColor = 'brightness(135%)';

        li.innerHTML = `
            <a href="${contributor.html_url}" target="_blank">
                <img class="contributor-image" src="${contributor.avatar_url}" alt="${contributor.login}" width="100" height="100">
            </a>
            <p class="contributor-name">
                <a href="${contributor.html_url}" target="_blank">${contributor.login}</a>
            </p>
        `;

       // Apply color styles dynamically
li.addEventListener('mouseover', () => {
    //li.querySelector('.contributor-name a').style.color = hoverColor;
    li.querySelector('.contributor-image').style.filter = brightnessColor;
    li.querySelector('.contributor-image').style.transform = 'scale(1.2)';
    li.style.transition = '0.3s';
});

li.addEventListener('mouseout', () => {
    //li.querySelector('.contributor-name a').style.color = ''; // Reset color to default
    li.querySelector('.contributor-image').style.filter = ''; // Reset filter to default
    li.querySelector('.contributor-image').style.transform = ''; // Reset transform to default
    li.style.transition = ''; // Reset transition to default
});
const contributorName = li.querySelector('.contributor-name a');

// Contributor Name event listeners
contributorName.addEventListener('mouseover', () => {
    contributorName.style.color = hoverColor;
    li.style.transition = '0.3s';
});

contributorName.addEventListener('mouseout', () => {
    contributorName.style.color = ''; // Reset color to default
    li.style.transition = ''; // Reset transition to default
});

        contributorsList.append(li);
    }
}

const owner='Spandan-Bhattacharya';
const repo='Solve_it';
fetchContributors(owner,repo)
    .then(contributors => displayContributors(contributors))
    .catch(error => console.log(error.message));
