function alertTest(alertTestMessage){}function loadPanel(panelID,templateFile){if((panelID)&&(templateFile)){var thisTabLink;var thisTab;var allTabs=jQuery('#'+panelID+' div ul.paneltabrow li');jQuery(allTabs).find('a').each(function(){alertTest("LOOP ALL (this).attr('href') == "+jQuery(this).attr('href'));if(jQuery(this).attr('href')==templateFile){alertTest("href matches");thisTabLink=jQuery(this);thisTab=jQuery(this).parents('li');return false;}});alertTest("Exit loop");jQuery(allTabs).find('a.loadingTabText').html('');jQuery(thisTabLink).addClass('originalTabText');jQuery(thisTabLink).hide();jQuery('<a class="loadingTabText ui-tabs-loading"><em>Loading...</em></a>').insertAfter(jQuery(thisTabLink));var thisPanelTabBody=jQuery(("#"+panelID+"_tab_body span."+panelID));if(templateFile.charAt(0)=='#'){}thisPanelTabBody.load(templateFile,function(){jQuery(thisTab).find('a.loadingTabText').remove();jQuery(thisTabLink).show();});}}function isDiv(e){return e&&e.tagName.toLowerCase()=="div";}function loadAllPanels(){if(jQuery('#multimedia_tab_body span.multimedia').html()==""){jQuery('body').find('div.panelarea').each(loadAllPanelsRoutine);}}function loadAllPanelsRoutine(){var e=this;var panelID=jQuery(e).attr('id');var templateFile=jQuery('#'+panelID+' ul.paneltabrow li a').slice(0,1).attr('href');loadPanel(panelID,templateFile);}function showAllSubPanels(panelID){jQuery('body').find('div#'+panelID+' div.subpanel').each(showFirstSubpanelTabContent);}function showFirstSubpanelTabContent(){alertTest('RUNNING showFirstSubpanelTabContent()');var e=this;var thisSubPanelTabBodyContent=jQuery(e).find('.subpanel_body_content');showSubpanelBody(thisSubPanelTabBodyContent.slice(0,1));}function showSubpanelClickThis(thisSubpanelTabLink){alertTest('showSubpanelClickThis() has been passed the following element (This is the ID): '+jQuery(thisSubpanelTabLink).attr('id'));var subpanelTabLinksAll=jQuery(thisSubpanelTabLink).parents('ul.subtabrow').find('a');var thisSubpanelTabLinkIndex=subpanelTabLinksAll.index(thisSubpanelTabLink);var subpanelTabBodiesAll=jQuery(thisSubpanelTabLink).parents('.subpanel').find('.subpanel_body_content');var thisSubPanelTabBodyContent=subpanelTabBodiesAll.slice(thisSubpanelTabLinkIndex,thisSubpanelTabLinkIndex+1);alertTest("RUNNING: showSubpanelClickThis(thisSubPanelTabContent) param = "+jQuery(thisSubPanelTabBodyContent).attr('id'));showSubpanelBody(thisSubPanelTabBodyContent);}function showSubpanelBody(thisSubPanelTabBodyContent){alertTest("RUNNING: showSubpanelBody(thisSubPanelTabBodyContent) param = "+jQuery(thisSubPanelTabBodyContent).attr('id'));var subpanelTabBodyContentAll=jQuery(thisSubPanelTabBodyContent).parents('div.subpanel_body').find('div.subpanel_body_content');jQuery(subpanelTabBodyContentAll).hide();jQuery(subpanelTabBodyContentAll).css({'visibility':'hidden','position':'absolute'});jQuery(thisSubPanelTabBodyContent).show();jQuery(thisSubPanelTabBodyContent).css({'visibility':'visible','position':'relative'});}jQuery(document).ready(function(){loadAllPanels();jQuery('ul.paneltabrow li a').click(function(){var thisPanelID=jQuery(this).parents('div.panelarea').attr('id');var templateFile=jQuery(this).attr('href');loadPanel(thisPanelID,templateFile);});});