$(() =>
{
    const URLS = {
        suggestions: '/suggestedContent',
        coworkers: '/coworkers'
    }

    const getSuggestions = (callbackFunction) =>
    {
        fetch(`${URLS.suggestions}`)
            .then(response => response.json())
            .then(data => { if (callbackFunction) callbackFunction(data) })
            .catch(error => { console.error('Error fetching suggested content: ', error) });
    }

    const getCoworkers = (callbackFunction) =>
    {
        fetch(`${URLS.coworkers}`)
            .then(response => response.json())
            .then(data => { if (callbackFunction) callbackFunction(data) })
            .catch(error => { console.error('Error fetching coworkers: ', error) });
    }

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
    }

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
    }

    getSuggestions(data =>
    {
        data.forEach((suggestion, index) =>
        {
            const suggestionElement = createSuggestionElement(suggestion);

            if (index === 0)
                suggestionElement.addClass('active');

            $('.carousel-inner').append(suggestionElement);
        });
    });

    getCoworkers(data =>
    {
        data.forEach(coworker =>
        {
            $('.coworkers').append(createCoworkerElement(coworker));
        });
    });
});



