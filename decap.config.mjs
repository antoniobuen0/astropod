import astropodConfig from "./astropod.config.json";
import languageList from "./src/helpers/languagesList.json";
import podcastMainCategories from "./src/helpers/podcastMainCategories.json";

export default function dcapconfig() {
  const config = {
    backend: {
      name: "astropod",
      branch: "main",
    },
    collections: [
      {
        name: "episodes",
        label: "Episodes",
        label_singular: "Episode",
        folder: "src/content/episode",
        sortable_fields: ["title", "pubDate", "episode", "season"],
        create: true,
        delete: true,
        fields: [
          { name: "title", widget: "string", label: "Episode Title" },
          { name: "audioUrl", widget: "string", label: "Audio URL" },
          { name: "pubDate", widget: "date", label: "Publish Date", format: "DD MMM YYYY" },
          { name: "body", widget: "markdown", label: "Episode Body", required: false },
          {
            name: "duration",
            widget: "string",
            label: "Episode Duration",
            pattern: [
              "^(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9]$|^[0-5]?[0-9]:[0-5]?[0-9]$",
              "Must have format hh:mm:ss or mm:ss",
            ],
          },
          { name: "size", widget: "number", label: "Episode Size (MB)", value_type: "float" },
          { name: "cover", widget: "image", label: "Custom Cover URL", required: false },
          { name: "explicit", widget: "boolean", label: "Explicit", required: false, default: astropodConfig.explicit },
          { name: "episode", widget: "number", label: "Episode", required: false },
          { name: "season", widget: "number", label: "Season", required: false },
          {
            name: "episodeType",
            widget: "select",
            label: "Episode Type",
            default: "full",
            options: [
              { label: "Full", value: "full" },
              { label: "Trailer", value: "trailer" },
              { label: "Bonus", value: "bonus" },
            ],
          },
        ],
      },
      {
        name: "settings",
        label: "Settings",
        files: [
          {
            name: "general",
            label: "General",
            file: "astropod.config.json",
            fields: [
              { name: "name", widget: "string", label: "Name" },
              { name: "description", widget: "text", label: "Description" },
              { name: "link", widget: "string", label: "Link" },
              { name: "cover", widget: "image", label: "Cover" },
              { name: "banner", widget: "image", label: "Banner" },
              { name: "author", widget: "string", label: "Author" },
              {
                name: "email",
                widget: "string",
                label: "email",
                pattern: ["^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$", "Please enter a valid email address"],
              },
              { name: "owner", widget: "string", label: "Owner", required: false },
              { name: "copyright", widget: "string", label: "Copyright", required: false },
              {
                name: "language",
                widget: "select",
                label: "Language",
                default: "en",
                options: languageList,
              },
              { name: "explicit", widget: "boolean", label: "Explicit", default: false },
              {
                name: "category",
                widget: "select",
                label: "Category",
                multiple: true,
                options: podcastMainCategories,
                max: 3
              },
            ],
          },
        ],
      },
    ],
    disableIdentityWidgetInjection: true,
  };
  return config;
}
