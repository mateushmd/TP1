import main from "./main.js";

$(() =>
{
    const urlParams = new URLSearchParams(window.location.search);

    const repoName = urlParams.get('name');

    const createTopic = (topicName) =>
    {
        const div = $('<div>', { class: 'topic p-sm-2 px-sm-4 p-1 rounded' });
        div.append($('<span>', { text: topicName }));
        return div;
    };

    main.get(`https://api.github.com/repos/${main.GITHUB_USER}/${repoName}`, repo =>
    {
        if (repo.length === 0)
        {
            const mainEl = $('main');
            mainEl.empty();
            mainEl.append($('<h1>', { text: 'Repositório não encontrado' }));
            return;
        }

        $('#repo-name').text(repo.name);
        $('#repo-description').text(repo.description !== null ? repo.description : 'Sem descrição');
        $('#repo-created').text(repo.created_at.substring(0, 10));
        $('#repo-language').text(repo.language !== null ? repo.language : 'Sem linguagem principal');
        $('#repo-link').prop('href', repo.git_url);
        $('#repo-link').text(repo.git_url);
        $('#repo-stars').text(repo.stargazers_count);
        $('#repo-watchers').text(repo.watchers_count);

        main.get(repo.languages_url, languages =>
        {
            const languagesNames = Object.keys(languages);

            const repoTopicsEl = $('#repo-topics');

            if (languagesNames.length === 0)
            {
                repoTopicsEl.append($('<span>', { text: 'Nenhum tópico para mostrar' }));
            }

            languagesNames.forEach(language =>
            {
                const topicEl = createTopic(language);
                repoTopicsEl.append(topicEl);
            });
        });
    }, () =>
    {
        const repoEl = $('#repository');
        repoEl.empty();
        repoEl.append($('<h2>', { text: 'Repositório não encontrado' }));
        return;
    });
});