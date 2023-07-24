CM is a monolithic React / Ruby application. It uses Vite for faster development of the Frontend.

# Installation

## Pre-requisites
* Node v16
* Ruby 3.2.2

## Setup dependencies

```
npm install
bundle install
rails db:prepare
```

## Start the server

Start Vite dev server with:
```
./bin/vite dev
```
And Rails with:
```
bundle exec rails s
```

## Run tests
### BE
```
bundle rails db:prepare
bundle exec rspec
```

### FE 
```
npm run test
```

# How to use

It should be mostly self explanatory, but access the server with `localhost:3000`. You should see the Culture Matcher hero and an empty table, that you can fill using the Modal that opens with clicking the `+` sign in the top left corner. Same goes for other Tabs (Company and Culture Type). The last tab is the Matches tab, where you can match the Company and the Applicants.

---


# Considerations

- Tests should be run with `bundle exec rspec`, otherwise you might see the following warning `WARN: Unresolved or ambiguous specs during Gem::Specification.reset` and this is due to `racc` version being used by base Ruby differing from Nokogiri's.
- The `undefined` part for the culture type was pretty confusing because I didn't know whether it should be in the BE and the FE or simply in the FE. So I added a not so good in the BE as well. I tried using the model and the Database to enforce that the default culture type is ID 1 ( undefined ).

# To be improved

- Use uuid for databases IDs so that the IDs don't are too obvious / leak
- Improve 'undefined' logic for culture type as it is pretty barebones... Maybe remove it and treat it only in FE?
- Dark Reader (Firefox) make the CSS look funny even when disabled
- CSFR tokens are disabled
- Add modals are pretty simple and repeat a lot, they need to be DRY-ed
- HTML is very simple on purpose, everything is put under a header
- `MaterialReactTable` has built-in filters but they are only front-end (we need all the data at runtime) so it would be better to offload some of that to the back-end as well
- Performance in the `match` function `app/controllers/api/v1/matches_controller.rb` could be improved through batches, we don't need to do it all at once
- Jest tests have a good base but need to be improved because they don't test a lot
- Create controller/request tests for the company matcher handler - since it renders it would take more time
- `spec/requests/matches_spec.rb` has the same test as `app/models/match.rb` and this is not ideal, I could do it with dependency inversion and spies but it wouldn't look as neat, so this needs to be improved as a whole

# Checklist
## Use Cases

- [x] It should be possible to create culture types
- [x] It should be possible to list culture types
- [x] It should be possible to create companies and select a culture type.
- [x] It should be possible to create applicants and select a culture type.
- [x] It should be possible to visualise the list of companies
- [x] It should be possible to visualise the list of applicants
- [x] It should be possible to match applicants and companies
- [x] As a company, it should be possible to visualise the matched applicants
- [x] Given I'm on the frontend application, when I click on "Start match", then applicants and companies with the same culture type are matched and included into the matches table.
- [x] Given I'm on the frontend application, when I access a company, then I should see the list of matches.

# Requirements
## Backend

- [x] Ruby on Rails.
- [x] Timestamps, when presented, should be presented in in ISO8601 format.
- [x] API architecture: REST.
- [x] API documentation: OpenAPI.
- [x] Database: PostgreSQL.
- [x] Tested
- [ ] Documented
- [x] Linted

### Extra
- [ ] Docker

--- 

## Frontend

- [x] ReactJS
- [x] JS or Typescript
- [x] Jest
- [x] Tested
- [ ] Documented
- [x] Linted

---