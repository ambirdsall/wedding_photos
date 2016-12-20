require 'rails_helper'

RSpec.describe PeopleController, type: :controller do

  after(:all) { Person.destroy_all }

  # This should return the minimal set of attributes required to create a valid
  # Person. As you add validations to Person, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    attributes_for(:person)
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # PeopleController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all people as @people" do
      person = create(:person)
      get :index, params: {}, session: valid_session
      expect(assigns(:people)).to eq([person])
    end
  end

  describe "GET #show" do
    it "assigns the requested person as @person" do
      person = create(:person)
      get :show, {id: person.to_param}
      expect(assigns(:person)).to eq(person)
    end
  end

  describe "GET #new" do
    it "assigns a new person as @person" do
      get :new, params: {}, session: valid_session
      expect(assigns(:person)).to be_a_new(Person)
    end
  end

  describe "GET #edit" do
    it "assigns the requested person as @person" do
      person = create(:person)
      get :edit, {id: person.to_param}
      expect(assigns(:person)).to eq(person)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Person" do
        expect {
          post :create, {person: valid_attributes}
        }.to change(Person, :count).by(1)
      end

      it "assigns a newly created person as @person" do
        post :create, {person: valid_attributes}
        expect(assigns(:person)).to be_a(Person)
        expect(assigns(:person)).to be_persisted
      end

      it "redirects to the created person" do
        post :create, {person: valid_attributes}
        expect(response).to redirect_to(Person.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved person as @person" do
        post :create, params: {person: invalid_attributes}, session: valid_session
        expect(assigns(:person)).to be_a_new(Person)
      end

      it "re-renders the 'new' template" do
        post :create, params: {person: invalid_attributes}, session: valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        attributes_for(:person, first_name: 'Rutabega', last_name: 'McGee')
      }

      it "updates the requested person" do
        person = Person.create! valid_attributes
        put :update, {id: person.to_param, person: new_attributes}
        person.reload
        expect(person.first_name).to eq('Rutabega')
        expect(person.last_name).to eq('McGee')
      end

      it "assigns the requested person as @person" do
        person = Person.create! valid_attributes
        put :update, {id: person.to_param, person: valid_attributes}
        expect(assigns(:person)).to eq(person)
      end

      it "redirects to the person" do
        person = Person.create! valid_attributes
        put :update, {id: person.to_param, person: valid_attributes}
        expect(response).to redirect_to(person)
      end
    end

    context "with invalid params" do
      it "assigns the person as @person" do
        person = Person.create! valid_attributes
        put :update, params: {id: person.to_param, person: invalid_attributes}, session: valid_session
        expect(assigns(:person)).to eq(person)
      end

      it "re-renders the 'edit' template" do
        person = Person.create! valid_attributes
        put :update, {id: person.to_param, person: invalid_attributes}, session: valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested person" do
      person = Person.create! valid_attributes
      expect {
        delete :destroy, {id: person.to_param}
      }.to change(Person, :count).by(-1)
    end

    it "redirects to the people list" do
      person = Person.create! valid_attributes
      delete :destroy, {id: person.to_param}
      expect(response).to redirect_to(people_url)
    end
  end

end
