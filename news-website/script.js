document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');

    const articles = [
        {
            title: 'Breaking News: AI Surpasses Human Intelligence in New Test',
            summary: 'In a groundbreaking study, advanced AI models have demonstrated cognitive abilities exceeding human benchmarks in complex problem-solving and creative tasks.',
            date: 'October 26, 2023',
            link: '#'
        },
        {
            title: 'Global Markets React to Latest Economic Report',
            summary: 'Analysts are closely watching market fluctuations after the release of a critical economic report, indicating potential shifts in global financial landscapes.',
            date: 'October 26, 2023',
            link: '#'
        },
        {
            title: 'New Discoveries in Space Exploration Unveiled',
            summary: 'Astronomers have announced several unprecedented discoveries from the latest space mission, offering new insights into the universe.',
            date: 'October 25, 2023',
            link: '#'
        },
        {
            title: 'Health Officials Issue Warning on Seasonal Flu Strain',
            summary: 'Public health authorities are advising increased vigilance as a new, more virulent strain of the seasonal flu begins to spread globally.',
            date: 'October 25, 2023',
            link: '#'
        }
    ];

    const articleList = newsContainer.querySelector('.article-list');
    articleList.innerHTML = ''; // Clear existing static content

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('news-article');
        articleElement.innerHTML = `
            <h3><a href="${article.link}">${article.title}</a></h3>
            <p class="summary">${article.summary}</p>
            <span class="date">${article.date}</span>
        `;
        articleList.appendChild(articleElement);
    });
});
