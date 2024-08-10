import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import NotFound from './components/body/notfound/NotFound';
import TransferToMainWeb from './TransferToMainWeb';


function NewRouter() {

    return (
        <section style={{ marginTop: 'unset' }}>
            <Switch>
                {/* <Route path="/survey/make_new/:idRoom"  component={SurveyOnline} exact/>
                <Route path="/survey/make"  component={SurveyOnline} exact/>
                <Route path="/survey/home/:idBranch"  component={Home} exact/>
                <Route path="/waiting/make"  component={SurveyOnline} exact/>
                <Route path="/survey/make/:idWaiting"  component={SurveyOnline} exact/>
                <Route path="/survey/view/:idSurvey" component={SurveyOnline} exact/>
                <Route path="/survey/complete/:language/:idBranch" component={ThankPage} exact/>
                <Route path="/survey/complete/:language" component={ThankPage} exact/>
                <Route path="/roten/make_new/:idRoten"  component={RotenSurvey} exact/>
                <Route path="/make_id/:idBranch" component={MakeIDByList} exact/> */}
                {/* <Route path="/survey/complete/:language" component={ThankPage} exact/> */}
                <Route path="/:name"  component={TransferToMainWeb} exact/>
                {/* <Route path="/*"  component={NotFound} exact/> */}
            </Switch>
        </section>
    );
}

export default NewRouter;
