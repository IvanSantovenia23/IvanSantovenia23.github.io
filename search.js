$(document).ready(function() {
    let index = [];

    // Cargar el sitemap.xml y generar el índice
    $.ajax({
        url: 'sitemap.xml',
        dataType: 'xml',
        success: function(data) {
            $(data).find('url').each(function() {
                const loc = $(this).find('loc').text();
                const title = $(this).find('title').text();

                // Cargar el contenido de cada página
                $.get(loc, function(pageContent) {
                    index.push({
                        url: loc,
                        title: title,
                        content: $(pageContent).text()
                    });
                });
            });
        }
    });

    // Manejar el formulario de búsqueda
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        const query = $('#search-input').val().toLowerCase();
        let results = '';

        index.forEach(page => {
            if (page.content.toLowerCase().includes(query)) {
                results += `<div><a href="${page.url}">${page.title}</a></div>`;
            }
        });

        $('#search-results').html(results || '<p>No se encontraron resultados.</p>');
    });
});
