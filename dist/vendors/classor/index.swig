<!DOCTYPE html>
<html>

<head>
    <!-- Standard Meta -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <meta name="keywords" content="{{keywords|join(',')}}"/>
    <meta name="description" content="{{description}}"/>
    <meta name="author" content="{{author|raw}}"/>
    <!-- Site Properities -->
    <title>{{name}} - {{description}}</title>

    <link rel="stylesheet" type="text/css" href="css/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.js"></script>
    <script src="js/semantic.min.js"></script>
</head>

<body id="home">
    <div class="ui inverted black vertical segment">
        <div class="ui page grid">
            <div class="column center aligned site-header-column">
                <h1>{{name|capitalize}}.JS</h1>
                <span class="ui mini label" id="version">v{{version}}</span>
                <p class="ui medium inverted header" id="description"></p>
                <a class="ui inverted blue huge button" href="https://github.com/mamboer/classy/archive/master.zip">Download</a>
                <br />
            </div>
        </div>
    </div>

    <div class="ui vertical segment">
        <div class="ui page grid">
            <div class="column center aligned">
                <div class="addthis_sharing_toolbox"></div>
                <a href="https://github.com/mamboer" class="github-button">Follow {{author|raw}}</a>
                <a data-count-api="/repos/mamboer/classy#stargazers_count" data-count-href="/mamboer/classy/stargazers" href="https://github.com/mamboer/classy" class="github-button">Star</a>
                <a data-count-api="/repos/mamboer/classy#forks_count" data-count-href="/mamboer/classy/network" href="https://github.com/mamboer/classy/fork" class="github-button">Fork</a>
            </div>
        </div>
    </div>

    <div class="ui vertical segment">
        <div class="ui page grid">
            <div class="column">
                <h1>Installation</h1>
                <p>Add the classy.js to your page:</p>
                <pre><code data-language="html">&lt;script src="/path/to/classy.min.js"&gt;&lt;/script&gt;</code></pre>
                <p>Or, load the classy.js using your AMD loader like ```requirejs```</p>
                <pre><code data-language="javascript">define(['classy'],function(classy){/* module logic goes here */});</code></pre>
            </div>
        </div>
    </div>

    <div class="ui vertical segment">
        <div class="ui page grid">
            <div class="column">
                <h1>API</h1>
                <div class="ui warning message">
                    <p>Classy.JS support manipulating multiple classes seperated by blank space!</p>
                    <pre><code data-language="javascript">classy.apiName(elm,'class1 class2');</code></pre>
                </div>
                <div class="ui segment">
                    <label class="ui right ribbon label">has</label>
                    <h4 class="ui header">has</h4>
                    <pre><code data-language="javascript">classy.has(elm,'button');</code></pre>
                    <div class="ui blue button" onclick="alert('I has a class named button!'+classy.has(this,'button'));">Run</div>
                </div>
                <div class="ui segment">
                    <label class="ui right ribbon label">add</label>
                    <h4 class="ui header">add</h4>
                    <pre><code data-language="javascript">classy.add(elm,'pink');</code></pre>
                    <div class="ui blue button" onclick="classy.add(this,'pink');">Run</div>
                </div>
                <div class="ui segment">
                    <label class="ui right ribbon label">remove</label>
                    <h4 class="ui header">remove</h4>
                    <pre><code data-language="javascript">classy.remove(elm,'green');</code></pre>
                    <div class="ui blue green button" onclick="classy.remove(this,'green');">Run</div>
                </div>
                
                <div class="ui segment">
                    <label class="ui right ribbon label">removeByPrefix</label>
                    <h4 class="ui header">removeByPrefix</h4>
                    <pre><code data-language="javascript">classy.removeByPrefix(elm,'btn-');</code></pre>
                    <div class="ui blue button btn-cool btn-hot" onclick="alert('classes ['+ classy.removeByPrefix(this,'btn-')+'] have been removed!');">Run</div>
                </div>

                <div class="ui segment">
                    <label class="ui right ribbon label">toggle</label>
                    <h4 class="ui header">toggle</h4>
                    <pre><code data-language="javascript">classy.toggle(elm,'blue');</code></pre>
                    <div class="ui blue button" onclick="classy.toggle(this,'blue');">Run</div>
                </div>

            </div>
        </div>
    </div>

    <div class="ui vertical segment">
        <div class="ui page grid">
            <div class="column">
                <h1>Build</h1>
                <p>
                  To build Classy.JS from sources you need to install Gulp
                </p>
                <pre><code data-language="shell">$ npm install gulp -g</code></pre>
                <p>
                  Then navigate in terminal to the downloaded sources and install some required modules
                </p>
                <pre><code data-language="shell">$ npm install gulp gulp-uglify gulp-swig gulp-rename</code></pre>
                <p>
                  Then run Gulp
                </p>
                <pre><code data-language="shell">$ gulp</code></pre>
                <p>
                  You can take compressed and optimized files from <b>dist</b> folder
                </p>
            </div>
        </div>
    </div>

    <div class="ui inverted black vertical segment">
        <div class="ui page grid">
            <div class="column">
                <p>
                  Created by <a href="http://faso.me">Levin Van</a>, 2015
                  <br />
                  <br />Site built with awesome <a href="http://semantic-ui.com">Semantic UI</a>
                </p>
            </div>
        </div>
    </div>

    <script async defer id="github-bjs" src="https://buttons.github.io/buttons.js"></script>
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5510fb2a3e0ad455" async="async"></script>
    <script src="dist/classy.min.js"></script>

    <link href="https://cdn.rawgit.com/ccampbell/rainbow/master/themes/solarized-dark.css" rel="stylesheet" type="text/css" />
    <script src="js/rainbow-custom.min.js" type="text/javascript"></script>
    
    <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?5359e341cb22415e37046212a9e2b4f0";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>

 </body>

</html>
