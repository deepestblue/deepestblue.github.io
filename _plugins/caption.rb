module Jekyll
    class Jekyll::MarkdownCaption < Jekyll::Converters::Markdown::KramdownParser
        def convert(content)
            super.gsub(/<\/table>\n+<p>Table: (.*?)<\/p>/, '<caption>\1</caption></table>')
        end
    end
end
