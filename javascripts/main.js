/**
 * 
 */
try { if (!pt){ pt = {}; } } catch(e){pt = {};}

$(document).ready(function(){
    $.getJSON("https://api.github.com/users/purtuga/repos?callback=?")
        .then(function(projects){
            var h = "";
            $.each(projects.data, function(i, p) {
                if (p.name.toLowerCase() === "purtuga.github.com") { return; };
                h += '<li><strong><a href="' + p.html_url + '">' + 
                     p.name + '</a></strong> : ' + p.description + '</li>';
            });
            $("#ptProjects").html(h);
        });
        
    $.getJSON("http://www.gravatar.com/8fed973012499e7ab4bb3dad481a899d.json?callback=?")
        .then(function(info){
            var me      = info.entry[0],
                profile = $('<div class="pt-author-cntr">' +
                           '<div class="pt-left-col">' +
                                '<div class="pt-img"></div>' +
                                '<div class="pt-location"></div>' +
                            '</div>' +
                            '<div class="pt-right-col">' +
                                '<h4 class="pt-name"></h4>'+
                                '<div class="pt-links"></div>' +
                            '</div>' +
                        '</div>'),
                tmp     = "";
            profile.find(".pt-img")
                    .empty()
                    .append('<img src="' + me.thumbnailUrl + '" />')
                    .end()
                .find(".pt-location")
                    .empty()
                    .append(me.currentLocation)
                    .end()
                .find(".pt-name")
                    .empty()
                    .append(me.displayName)
                    .end();
            
            tmp = "<ul>";
            for(var i=0,j=me.urls.length; i<j; i++){
                tmp += '<li><a href="' + me.urls[i].value +
                       '">' + me.urls[i].title + '</a> </li>';
            };
            tmp += "</ul>";
            profile.find(".pt-links").html(tmp);
            
            $('#ptAboutMe').html(profile);
        });
});

