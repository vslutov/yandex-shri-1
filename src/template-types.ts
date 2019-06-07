export type Html = string

export interface TemplateArguments {
    mixins: Classnames
    modifiers: Modifiers
    children: Html
}

export type TemplateFunction = (TemplateArguments) => Html
