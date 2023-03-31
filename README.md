# n8n-nodes-jnode
This is an n8n community node. It lets you use Joplin in your n8n workflows.

This repository contains a project aimed at integrating n8n with Joplin using the Joplin API node wrapper created by @rxliuli. This is a personal project, and as a non-developer, this is my first attempt at building anything with Node.js. The project is functional and suits my current workflow, so I decided to share it with others. I will ditch it the very moment some competent developer write a proper node. 

As the project progresses, I will continue to extend its functionality and implement all the capabilities of the Joplin API provided by @rxliuli. Code quality of this node is below your worst expectations, as I am using this project to learn Node.js, GitHub, and modern coding practices in general.

I would like to thank the n8n team for creating a great piece of software, the Taiga node contributors in particular, as I dissected it mercilessly to understand how n8n nodes work. Additionally, I want to express my gratitude to Joplin for its existence and @rxliuli for an opportunity to work with a well-documented Node.js API.

Joplin is a free, open source note taking and to-do application, which can handle a large number of notes organised into notebooks.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations
Folder
- Create
- Remove

Note
- Create
- Remove
- Update

Tag
- Create
- Assign

## Credentials

Get a token from a Joplin desktop app and configure remote access (see ## Usage)

## Compatibility
Version: 0.219.1

## Usage

Joplin does not provide a remote API access by default so you have to figure out what setup works for you.
Existing API is designed to be exposed locally on client side and interact with local desktop plugins. It IS NOT intended to be used for remote calls. This means no warranties or even promises regarding sync issues, data safety and so on. There are multiple community guides on setting up a Joplin sync workflow. 

To consume this API you have to run Clipper service and make it accessible for your n8n installation.

Clipper service is listening to 41184 port locally so it is necessary to set up some kind of forwarding if you use any setup but local. This one works fine for Ubuntu.

socat -d -d tcp-listen:41185,reuseaddr,fork tcp:localhost:41184

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Version history

0.2.0
Initial release
Features

Folder
- Create
- Remove

Note
- Create
- Remove
- Update

Tag
- Create
- Assign


