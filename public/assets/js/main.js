$(() =>
{
    const URLS = {
        suggestions: '/suggestedContent',
        coworkers: '/coworkers',
        githubUser: `https://api.github.com/users/${GITHUB_USER}`,
        githubSocialAccounts: `https://api.github.com/users/${GITHUB_USER}/social_accounts`,
        githubRepos: `https://api.github.com/users/${GITHUB_USER}/repos`
    };

    const createCoworkerElement = (coworker) =>
    {
        const container = $('<div>', { class: 'd-flex flex-column gap-2 align-items-center colega rounded p-2 colega-container' })
        container.append($('<img>', { class: 'colega-pic', src: coworker.urlPic, alt: '' }));
        container.append($('<h5>', { class: 'm-0', text: coworker.name }));

        container.on('click', () =>
        {
            window.open(coworker.urlGithub).focus();
        });

        return container;
    };

    const createSuggestionElement = (suggestion) =>
    {
        const container = $('<div>', { class: 'carousel-item' });

        const anchor = $('<a>', { href: suggestion.urlContent, class: 'd-flex justify-content-center', target: '_blank' });
        anchor.append($('<img>', { src: suggestion.urlImage, class: 'd-block w-75 carousel-img', alt: suggestion.title }));

        const caption = $('<div>', { class: 'carousel-caption' });
        caption.append($('<h5>', { text: suggestion.title }));
        caption.append($('<p>', { text: suggestion.description }));

        container.append(anchor);
        container.append(caption);

        return container;
    };

    const createSocialMediaLink = (socialMedia) =>
    {
        const anchor = $('<a>', { href: socialMedia.url, class: 'text-light text-decoration-none', target: '_blank' });
        anchor.append($('<i>', { class: `fab fa-${socialMedia.provider}` }));

        return anchor;
    };

    const createRepo = (repo) =>
    {
        const anchor = $('<a>', { href: `repo.html?name=${repo.name}`, class: 'w-25 text-decoration-none text-light repository rounded' });

        const div = $('<div>', { class: 'w-100 h-100 p-3 d-flex flex-column justify-content-between' });
        div.append($('<h3>', { text: repo.name }));
        div.append($('<p>', { text: repo.description }));

        const divStats = $('<div>', { class: 'd-flex align-items-center justify-content-around' });

        const spanStars = $('<span>', { text: ` ${repo.stargazers_count}` });
        spanStars.prepend($('<i>', { class: 'fa-regular fa-star fs-6' }));

        const spanWatchers = $('<span>', { text: ` ${repo.watchers_count}` });
        spanWatchers.prepend($('<i>', { class: 'fa-regular fa-user fs-6' }));

        divStats.append(spanStars);
        divStats.append(spanWatchers);

        div.append(divStats);
        anchor.append(div);

        return anchor;
    };

    get(URLS.suggestions, data =>
    {
        data.forEach((suggestion, index) =>
        {
            const suggestionElement = createSuggestionElement(suggestion);

            if (index === 0)
                suggestionElement.addClass('active');

            $('.carousel-inner').append(suggestionElement);
        });
    });

    get(URLS.coworkers, data =>
    {
        data.forEach(coworker =>
        {
            $('.coworkers').append(createCoworkerElement(coworker));
        });
    });

    get(URLS.githubUser, data =>
    {
        $('#profile-pic').attr('src', data.avatar_url);
        $('#profile-name').text(data.name);
        $('#title-name').text(data.name.toUpperCase());
        $('#about-me').text(data.bio);
        $('#location').text(data.location);
        $('#website').attr('href', data.blog);
        $('#followers').text(data.followers);
        $('#github').attr('href', data.url);
    });

    get(URLS.githubSocialAccounts, data =>
    {
        data.forEach(socialMedia =>
        {
            const socialMediaEl = createSocialMediaLink(socialMedia);

            $('#social-media-links').append(socialMediaEl);
        })
    });



    get(URLS.githubRepos, data =>
    {
        $('#repo-count').text(data.length);

        const repositoriesEl = $('#repositories');

        data.forEach(repo =>
        {
            const repoEl = createRepo(repo);

            repositoriesEl.append(repoEl);
        });
    })
});

const GITHUB_USER = 'mateushmd';

function get(url, callbackFunction, callbackFunctionError)
{
    fetch(url)
        .then(response =>
        {
            if (response.ok)
                return response.json();

            throw new Error(`response was not ok: ` + response.statusText);
        })
        .then(data => { if (callbackFunction) callbackFunction(data) })
        .catch(error =>
        {
            console.error(`Error fetching ${url}: `, error);
            if (callbackFunctionError) callbackFunctionError();
        });
};

export default { GITHUB_USER, get };