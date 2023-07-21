# Considerations

- Tests should be runned with `bundle exec rspec`, otherwise you might see the following warning `WARN: Unresolved or ambiguous specs during Gem::Specification.reset` and this is due to `racc` version being used by base Ruby differing from Nokogiri's.


# To be improved

- Use uuid for databases IDs so that the IDs don't are too obvious / leak
- Improve 'undefined' logic for culture type... Maybe remove it and treat it only in FE?
- Company Matcher is meant to be an aggregator (to reduce API calls), but at the moment the benefits are marginal. We could switch to APIs, but this means we wouldn't get anything from the Vite + Rails combination

# Checklist
## Use Cases

- [ ] It should be possible to create culture types
- [ ] It should be possible to list culture types
- [ ] It should be possible to create companies and select a culture type.
- [ ] It should be possible to create applicants and select a culture type.
- [ ] It should be possible to visualise the list of companies
- [ ] It should be possible to visualise the list of applicants
- [ ] It should be possible to match applicants and companies
- [ ] As a company, it should be possible to visualise the matched applicants
- [ ] Given I'm on the frontend application, when I click on "Start match", then applicants and companies with the same culture type are matched and included into the matches table.
- [ ] Given I'm on the frontend application, when I access a company, then I should see the list of matches.

# Requirements
## Backend

- [x] Ruby on Rails.
- [x] Timestamps, when presented, should be presented in in ISO8601 format.
- [x] API architecture: REST.
- [ ] API documentation: OpenAPI.
- [x] Database: PostgreSQL.
- [ ] Tested
- [ ] Documented
- [ ] Linted

### Extra
- [ ] Docker

--- 

## Frontend

- [x] ReactJS
- [ ] JS or Typescript
- [ ] Jest
- [ ] Tested
- [ ] Documented
- [ ] Linted

---